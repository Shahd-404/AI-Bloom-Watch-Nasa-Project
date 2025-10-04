# ============================================================
# File: server.py — Bloom API (stages-only + live weather fetch)
# Purpose: Predict bloom stage using stages model with California season rule
#          + /predict_live to fetch real weather (NASA POWER → Open-Meteo ERA5)
#          + serve static web UI from /app
# Author: BloomWatch
# ============================================================

from __future__ import annotations

# FastAPI & deps
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field
from typing import Optional, Dict, Any, Tuple

# Std libs
import os, math, warnings
from datetime import datetime as _dt

# Data/ML
import pandas as pd
import joblib

# HTTP client
import httpx

# =========================
# Config (env or defaults)
# =========================
STAGE_PATH = os.getenv("MODEL_STAGE_PATH", r"F:\Nasa project\Bloom_model\stage_multiclass.joblib")

# California season: March..May inclusive
def is_in_bloom_season(region: str, date_iso: str) -> bool:
    try:
        dt = _dt.fromisoformat(date_iso.replace("/", "-"))
    except Exception:
        return False
    month = dt.month
    if region.strip().lower() == "california":
        return 3 <= month <= 5
    return False

def _today_iso() -> str:
    # UTC for consistency with weather providers
    return _dt.utcnow().strftime("%Y-%m-%d")

# ==============
# Lazy load model
# ==============
_STAGE = None
def _load_stage():
    global _STAGE
    if _STAGE is None:
        if not os.path.exists(STAGE_PATH):
            raise FileNotFoundError(STAGE_PATH)
        _STAGE = joblib.load(STAGE_PATH)
    return _STAGE

# ======================
# Pydantic input schema
# ======================
class PredictQuery(BaseModel):
    region: str = Field(..., example="California")
    date: str   = Field(..., example="2024-04-15")

    # نقبل أي من الاسمين (_final أو العادي) — المابر يفضّل _final
    AirTemp_avg: Optional[float] = None
    AirTemp_max: Optional[float] = None
    AirTemp_min: Optional[float] = None
    Precipitation: Optional[float] = None
    Humidity_rel: Optional[float] = None
    VaporPressureDeficit: Optional[float] = None
    Evapotranspiration_ref: Optional[float] = None
    SpecificHumidity: Optional[float] = None
    SolarRadiation_sw: Optional[float] = None
    SurfacePressure: Optional[float] = None

    AirTemp_avg_final: Optional[float] = None
    AirTemp_max_final: Optional[float] = None
    AirTemp_min_final: Optional[float] = None
    Precipitation_final: Optional[float] = None
    Humidity_rel_final: Optional[float] = None
    VaporPressureDeficit_final: Optional[float] = None
    Evapotranspiration_ref_final: Optional[float] = None
    SpecificHumidity_final: Optional[float] = None
    SolarRadiation_sw_final: Optional[float] = None
    SurfacePressure_final: Optional[float] = None

    debug: bool = False

# ======================
# Feature engineering
# ======================
_BASE_KEYS = [
    "AirTemp_avg","AirTemp_max","AirTemp_min","Precipitation","Humidity_rel",
    "VaporPressureDeficit","Evapotranspiration_ref","SpecificHumidity",
    "SolarRadiation_sw","SurfacePressure"
]
_FINAL_KEYS = [f"{k}_final" for k in _BASE_KEYS]

# قيم افتراضية محايدة
_FALLBACKS = {k:0.0 for k in _FINAL_KEYS} | {
    "Humidity_rel_final": 50.0,
    "VaporPressureDeficit_final": 1.0,
    "SurfacePressure_final": 101.0  # kPa
}

def _prefer_final(payload: Dict[str, Any], base: str):
    if f"{base}_final" in payload and payload[f"{base}_final"] is not None:
        return payload[f"{base}_final"]
    return payload.get(base, None)

def _date_parts(date_str: str) -> Tuple[int,int,int]:
    dt = _dt.fromisoformat(date_str.replace("/", "-"))
    return dt.month, int(dt.strftime("%V")), int(dt.strftime("%j"))

def _engineer(date: str, region: str, numeric_final: Dict[str, float]) -> Dict[str, Any]:
    month, week, doy = _date_parts(date)
    feats: Dict[str, Any] = {}

    # 1) *_final
    for k,v in numeric_final.items():
        feats[k] = float(v)

    # 2) *_z = 0.0 (neutral)
    for b in _BASE_KEYS:
        feats[f"{b}_z"] = 0.0

    # 3) prior_* = 0.0
    for lab in ["bloom","EoB","LPoB","MoB","PoB","SoB"]:
        feats[f"prior_{lab}_w"] = 0.0

    # 4) temporal sin/cos
    feats["m_sin"] = math.sin(2*math.pi*month/12)
    feats["m_cos"] = math.cos(2*math.pi*month/12)
    feats["w_sin"] = math.sin(2*math.pi*week/53)
    feats["w_cos"] = math.cos(2*math.pi*week/53)
    feats["d_sin"] = math.sin(2*math.pi*doy/366)
    feats["d_cos"] = math.cos(2*math.pi*doy/366)

    # 5) region
    feats["region"] = str(region)
    return feats

def _align(df: pd.DataFrame, model, context=""):
    if hasattr(model, "feature_names_in_"):
        cols = list(model.feature_names_in_)
        missing = [c for c in cols if c not in df.columns]
        if missing:
            warnings.warn(f"Missing features {context}: {missing}")
        if "region" in missing:
            df["region"] = "unknown"
            missing = [c for c in missing if c!="region"]
        for c in missing:
            df[c] = 0.0
        df = df.reindex(columns=cols)
    return df

def _proba_multiclass(model, X: pd.DataFrame) -> tuple[str, float]:
    if hasattr(model, "predict_proba"):
        probs = model.predict_proba(X)[0]
        idx = probs.argmax()
        label = str(model.classes_[idx]) if hasattr(model,"classes_") else "Unknown"
        return label, float(probs[idx])
    label = str(model.predict(X)[0]) if hasattr(model,"predict") else "Unknown"
    return label, 1.0

def _map_payload(payload: Dict[str, Any]) -> Dict[str, Any]:
    features = {}
    for base in _BASE_KEYS:
        val = _prefer_final(payload, base)
        if val is None:
            val = _FALLBACKS[f"{base}_final"]
        try:
            features[f"{base}_final"] = float(val)
        except Exception:
            features[f"{base}_final"] = _FALLBACKS[f"{base}_final"]
    return {"date": payload["date"], "region": str(payload["region"]), "features": features}

# ==========================================
# Live Weather — NASA POWER + Open-Meteo ERA5
# ==========================================
_DEFAULT_LAT = 36.77
_DEFAULT_LON = -119.42

# Normalized → *_final mapping
_MAP_TO_FINAL = {
    "AirTemp_avg_final": "t2m_mean",
    "AirTemp_max_final": "t2m_max",
    "AirTemp_min_final": "t2m_min",
    "Precipitation_final": "precip",
    "Humidity_rel_final": "rh2m",
    "VaporPressureDeficit_final": "vpd",
    "Evapotranspiration_ref_final": "et0",
    "SpecificHumidity_final": "qv2m",
    "SolarRadiation_sw_final": "sw",
    "SurfacePressure_final": "ps",  # kPa expected by model
}

async def fetch_power_daily(lat: float, lon: float, day_iso: str) -> dict:
    """NASA POWER daily aggregates for the given day (kPa pressure)."""
    pars = ",".join([
        "T2M","T2M_MAX","T2M_MIN","PRECTOTCORR","RH2M","VPD",
        "ET0","QV2M","ALLSKY_SFC_SW_DWN","PS"
    ])
    url = (
        "https://power.larc.nasa.gov/api/temporal/daily/point"
        f"?parameters={pars}"
        f"&community=ag"
        f"&latitude={lat}&longitude={lon}"
        f"&start={day_iso.replace('-', '')}&end={day_iso.replace('-', '')}"
        f"&format=JSON"
    )
    async with httpx.AsyncClient(timeout=30) as client:
        r = await client.get(url)
        r.raise_for_status()
        js = r.json()
    d = js["properties"]["parameter"]
    def first_val(k): 
        return list(d.get(k, {}).values())[0] if d.get(k) else None
    return {
        "t2m_mean": first_val("T2M"),
        "t2m_max":  first_val("T2M_MAX"),
        "t2m_min":  first_val("T2M_MIN"),
        "precip":   first_val("PRECTOTCORR"),
        "rh2m":     first_val("RH2M"),
        "vpd":      first_val("VPD"),
        "et0":      first_val("ET0"),
        "qv2m":     first_val("QV2M"),
        "sw":       first_val("ALLSKY_SFC_SW_DWN"),
        "ps":       first_val("PS"),  # kPa already
    }

async def fetch_openmeteo_daily(lat: float, lon: float, day_iso: str) -> dict:
    """
    Open-Meteo ERA5 (archive) — reliable and supports all requested daily vars.
    Note: surface_pressure_mean is in Pa → convert to kPa.
    """
    url = (
        "https://archive-api.open-meteo.com/v1/era5"
        f"?latitude={lat}&longitude={lon}"
        "&daily=temperature_2m_max,temperature_2m_min,temperature_2m_mean,"
        "precipitation_sum,relative_humidity_2m_mean,et0_fao_evapotranspiration,"
        "vapor_pressure_deficit_mean,shortwave_radiation_sum,surface_pressure_mean"
        f"&start_date={day_iso}&end_date={day_iso}"
        "&timezone=UTC"
    )
    async with httpx.AsyncClient(timeout=30) as client:
        r = await client.get(url)
        r.raise_for_status()
        js = r.json()
    d = js.get("daily", {})
    times = d.get("time", []) or []
    # pick index of the requested day if exists; else last available
    try:
        idx = times.index(day_iso)
    except ValueError:
        idx = -1 if times else None

    def pick(k):
        arr = d.get(k, [])
        return (arr[idx] if (arr and idx is not None) else None)

    ps_pa = pick("surface_pressure_mean")
    ps_kpa = (ps_pa / 1000.0) if (ps_pa is not None) else None  # Pa → kPa

    return {
        "t2m_mean": pick("temperature_2m_mean"),
        "t2m_max":  pick("temperature_2m_max"),
        "t2m_min":  pick("temperature_2m_min"),
        "precip":   pick("precipitation_sum"),
        "rh2m":     pick("relative_humidity_2m_mean"),
        "vpd":      pick("vapor_pressure_deficit_mean"),
        "et0":      pick("et0_fao_evapotranspiration"),
        "qv2m":     None,  # not provided in ERA5 daily directly
        "sw":       pick("shortwave_radiation_sum"),
        "ps":       ps_kpa,
    }

def _normalize_to_payload(norm: dict) -> Dict[str, float]:
    """Map normalized keys → *_final, fill None with neutral defaults."""
    neutral = {
        "AirTemp_avg_final": 0.0,
        "AirTemp_max_final": 0.0,
        "AirTemp_min_final": 0.0,
        "Precipitation_final": 0.0,
        "Humidity_rel_final": 50.0,
        "VaporPressureDeficit_final": 1.0,
        "Evapotranspiration_ref_final": 0.0,
        "SpecificHumidity_final": 0.007,  # typical near-surface
        "SolarRadiation_sw_final": 0.0,
        "SurfacePressure_final": 101.0,   # kPa
    }
    out: Dict[str, float] = {}
    for final_name, norm_key in _MAP_TO_FINAL.items():
        val = norm.get(norm_key, None)
        try:
            out[final_name] = float(val) if val is not None and not (isinstance(val, float) and math.isnan(val)) else neutral[final_name]
        except Exception:
            out[final_name] = neutral[final_name]
    return out

# ==============
# FastAPI app
# ==============
app = FastAPI(
    title="Bloom API (stages-only + live)",
    version="1.3.0",
    description="Stages-only with California season rule + /predict_live (NASA POWER → Open-Meteo ERA5) + static web at /app"
)

# CORS (افتح للجميع للتجارب—قَصّره للإنتاج)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_credentials=True,
    allow_methods=["*"], allow_headers=["*"],
)

# Serve static UI if exists: F:\Nasa project\Bloom_api\web\
if os.path.isdir("web"):
    app.mount("/app", StaticFiles(directory="web", html=True), name="app")

@app.get("/")
def root():
    return {
        "status": "ok",
        "mode": "stages-only",
        "season_rule": "California bloom: Mar–May inclusive",
        "endpoints": ["/predict", "/predict_live", "/health", "/openapi.json", "/docs", "/app/"]
    }

@app.get("/health")
def health():
    return {"ok": True}

@app.post("/predict", tags=["Predict"])
def predict(q: PredictQuery):
    # 1) season check
    in_season = is_in_bloom_season(q.region, q.date)
    if not in_season:
        return {
            "region": q.region,
            "date": q.date,
            "bloom_flag": "NoBloom",
            "bloom_prob": 0.0,
            "bloom_stage": "OutOfSeason",
            "stage_prob": 0.0
        }

    # 2) stage model
    try:
        stage = _load_stage()
    except FileNotFoundError as e:
        raise HTTPException(status_code=500, detail=f"Stage model not found: {e}")

    mapped = _map_payload(q.dict())
    feats = _engineer(mapped["date"], mapped["region"], mapped["features"])
    df = pd.DataFrame([feats])
    X_stage = _align(df.copy(), stage, "(stage)")
    stage_label, stage_prob = _proba_multiclass(stage, X_stage)

    out = {
        "region": mapped["region"],
        "date": mapped["date"],
        "bloom_flag": "Bloom",
        "bloom_prob": 1.0,
        "bloom_stage": stage_label,
        "stage_prob": round(stage_prob, 6),
    }
    if q.debug:
        out["debug_info"] = {
            "input_cols": list(df.columns),
            "X_stage_cols": list(X_stage.columns)
        }
    return out

@app.get("/predict_live", tags=["Live"], summary="Fetch real weather → predict")
async def predict_live(
    lat: float | None = None,
    lon: float | None = None,
    date_iso: str | None = None,
    region: str = "California",
    debug: bool = False
):
    """
    1) حاول NASA POWER لليوم المحدد.
    2) لو فشل → Open-Meteo ERA5 لنفس اليوم.
    3) لو فشل الإثنان → قيم محايدة حتى لا تتوقف الواجهة.
    ثم يُستدعى نفس منطق /predict.
    """
    lat = lat if lat is not None else _DEFAULT_LAT
    lon = lon if lon is not None else _DEFAULT_LON
    day = date_iso or _today_iso()

    source = None
    norm = None

    # Try POWER
    try:
        norm = await fetch_power_daily(lat, lon, day)
        source = "NASA_POWER"
    except Exception:
        pass

    # Fallback ERA5
    if norm is None:
        try:
            norm = await fetch_openmeteo_daily(lat, lon, day)
            source = "Open-Meteo_ERA5"
        except Exception as e2:
            # Final fallback: neutral values so UI doesn't break
            norm = {}
            source = f"fallback_neutral ({e2})"

    final_payload = _normalize_to_payload(norm)
    payload = {
        "region": region,
        "date": day,
        **final_payload,
        "debug": debug
    }

    try:
        q = PredictQuery(**payload)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"invalid_payload: {e}")

    result = predict(q)

    if debug and isinstance(result, dict):
        result["live_source"] = source
        result["lat"] = lat
        result["lon"] = lon
        result["final_payload"] = {k: final_payload[k] for k in final_payload.keys()}
        result["normalized"] = norm
    return result
