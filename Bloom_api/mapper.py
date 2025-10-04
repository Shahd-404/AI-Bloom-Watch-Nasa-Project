# ============================================================
# File: Bloom_api/mapper.py
# Purpose: Map various incoming field names to model-ready features
# Author: BloomWatch
# ============================================================

from __future__ import annotations
from typing import Dict, Any

# 🔗 خرائط أسماء شائعة من APIs خارجية (وسعيها عند الحاجة)
OPEN_METEO_MAP = {
    "temperature_2m_mean": "AirTemp_avg_final",
    "temperature_2m_max":  "AirTemp_max_final",
    "temperature_2m_min":  "AirTemp_min_final",
    "precipitation_sum":   "Precipitation_final",
    "relative_humidity_2m_mean": "Humidity_rel_final",
    "vpd_mean":                 "VaporPressureDeficit_final",
    "et0_fao_evapotranspiration": "Evapotranspiration_ref_final",
    "specific_humidity_mean":     "SpecificHumidity_final",
    "shortwave_radiation_sum":    "SolarRadiation_sw_final",
    "surface_pressure_mean":      "SurfacePressure_final",
}

NASA_POWER_MAP = {
    # مثال تقريبي — عدّلي حسب حقول POWER التي ستستخدمينها
    "T2M_RANGE_DAILY_MEAN": "AirTemp_avg_final",
    "T2M_MAX":              "AirTemp_max_final",
    "T2M_MIN":              "AirTemp_min_final",
    "PRECTOTCORR":          "Precipitation_final",
    "RH2M":                 "Humidity_rel_final",
    "VPD":                  "VaporPressureDeficit_final",
    "EVPTRNS":              "Evapotranspiration_ref_final",
    "QV2M":                 "SpecificHumidity_final",
    "ALLSKY_SFC_SW_DWN":    "SolarRadiation_sw_final",
    "PS":                   "SurfacePressure_final",
}

# 🧭 القيم القياسية لو ناقص أي متغير
FALLBACKS = {
    "AirTemp_avg_final": 0.0,
    "AirTemp_max_final": 0.0,
    "AirTemp_min_final": 0.0,
    "Precipitation_final": 0.0,
    "Humidity_rel_final": 50.0,
    "VaporPressureDeficit_final": 1.0,
    "Evapotranspiration_ref_final": 0.0,
    "SpecificHumidity_final": 0.006,
    "SolarRadiation_sw_final": 0.0,
    "SurfacePressure_final": 101.0,
}

MODEL_KEYS = list(FALLBACKS.keys())

def _prefer_final(payload: Dict[str, Any], base: str) -> Any:
    """يحاول يرجّع *_final أولاً ثم الاسم العادي ثم None"""
    if f"{base}_final" in payload and payload[f"{base}_final"] is not None:
        return payload[f"{base}_final"]
    if base in payload and payload[base] is not None:
        return payload[base]
    return None

def _coerce_float(x):
    if x is None:
        return None
    if isinstance(x, (int, float)):
        return float(x)
    # لو جاي سترينج من Swagger
    try:
        return float(str(x).strip())
    except:
        return None

def map_external_payload_to_model_features(payload: Dict[str, Any]) -> Dict[str, Any]:
    """يرجّع dict: {date, region, features: {<model_cols...>}}"""
    # 1) region/date
    date = payload.get("date")
    region = str(payload.get("region", "unknown"))

    # 2) حاول نطبّق خرائط خارجية (لو جت مفاتيح Open-Meteo / NASA)
    ext = dict(payload)  # copy
    for src_map in (OPEN_METEO_MAP, NASA_POWER_MAP):
        for k_src, k_dst in src_map.items():
            if k_src in ext and ext[k_src] is not None and k_dst not in ext:
                ext[k_dst] = ext[k_src]

    # 3) اجمع الموديل keys
    features = {}
    for key in MODEL_KEYS:
        base = key.replace("_final", "")
        val = _prefer_final(ext, base)
        val = _coerce_float(val)
        if val is None:
            val = FALLBACKS[key]
        features[key] = val

    return {"date": date, "region": region, "features": features}
