# ============================================================
# File: Bloom_api/model_io.py
# Purpose: Load models + align features + run predictions
# Author: BloomWatch
# ============================================================

from __future__ import annotations
from typing import Dict, Any, Tuple, List
import os, math, warnings
from datetime import datetime

import joblib
import pandas as pd
from sklearn.base import BaseEstimator

# 🧱 أعمدة خام (للتحويل إلى *_z لاحقاً إن لزم)
BASE_KEYS = [
    "AirTemp_avg","AirTemp_max","AirTemp_min","Precipitation","Humidity_rel",
    "VaporPressureDeficit","Evapotranspiration_ref","SpecificHumidity",
    "SolarRadiation_sw","SurfacePressure"
]

def _date_parts(date_str: str) -> Tuple[int,int,int]:
    dt = datetime.fromisoformat(date_str.replace("/", "-"))
    month = dt.month
    week = int(dt.strftime("%V"))
    doy = int(dt.strftime("%j"))
    return month, week, doy

def _engineer_features(date: str, region: str, numeric_final: Dict[str, float]) -> Dict[str, Any]:
    """يضيف الأعمدة المتوقعة من البايبلاين (sin/cos + prior_* + *_z + region)"""
    month, week, doy = _date_parts(date)
    feats: Dict[str, Any] = {}

    # استخدم *_final مباشرة
    for k, v in numeric_final.items():
        feats[k] = float(v)

    # *_z كـ neutral = 0.0
    for base in BASE_KEYS:
        feats[f"{base}_z"] = 0.0

    # prior_* بدون تاريخ سابق → 0.0
    for lab in ["bloom","EoB","LPoB","MoB","PoB","SoB"]:
        feats[f"prior_{lab}_w"] = 0.0

    # sin/cos للزمن
    feats["m_sin"] = math.sin(2*math.pi*month/12)
    feats["m_cos"] = math.cos(2*math.pi*month/12)
    feats["w_sin"] = math.sin(2*math.pi*week/53)
    feats["w_cos"] = math.cos(2*math.pi*week/53)
    feats["d_sin"] = math.sin(2*math.pi*doy/366)
    feats["d_cos"] = math.cos(2*math.pi*doy/366)

    # region كنص
    feats["region"] = str(region)
    return feats

def _align_to_model(df: pd.DataFrame, model: BaseEstimator, context: str="") -> pd.DataFrame:
    if hasattr(model, "feature_names_in_"):
        cols = list(model.feature_names_in_)
        missing = [c for c in cols if c not in df.columns]
        if missing:
            warnings.warn(f"Missing features for prediction {context}: {missing}")
        if "region" in missing:
            df["region"] = "unknown"
            missing = [c for c in missing if c != "region"]
        for c in missing:
            df[c] = 0.0
        df = df.reindex(columns=cols)
    return df

def _proba(model: BaseEstimator, X: pd.DataFrame) -> Tuple[List[str] | None, List[float]]:
    if hasattr(model, "predict_proba"):
        proba = model.predict_proba(X)
        if proba.shape[1] == 2:
            return getattr(model, "classes_", None), proba[:,1].tolist()
        idx = proba.argmax(axis=1)
        return getattr(model, "classes_", None), [float(proba[i, idx[i]]) for i in range(len(idx))]
    # fallback
    return getattr(model, "classes_", None), [1.0]*len(X)

# 📦 Load models
def load_models_once(gate_path: str, stage_path: str):
    if not os.path.exists(gate_path):
        raise FileNotFoundError(gate_path)
    if not os.path.exists(stage_path):
        raise FileNotFoundError(stage_path)
    gate = joblib.load(gate_path)
    stage = joblib.load(stage_path)
    return gate, stage

# 🔮 Predictors
def predict_one(
    gate_model: BaseEstimator,
    stage_model: BaseEstimator,
    date: str,
    region: str,
    features: Dict[str, float],
    prob_threshold: float = 0.5,
    debug: bool = False
) -> Dict[str, Any]:

    feats = _engineer_features(date, region, features)
    df = pd.DataFrame([feats])

    X_gate  = _align_to_model(df.copy(), gate_model,  "(gate)")
    X_stage = _align_to_model(df.copy(), stage_model, "(stage)")

    _, gate_probs = _proba(gate_model, X_gate)
    bloom = 1 if gate_probs[0] >= prob_threshold else 0

    if hasattr(stage_model, "predict"):
        stage_pred = stage_model.predict(X_stage)
        stage_label = str(stage_pred[0])
    else:
        stage_label = "Unknown"

    _, stage_probs = _proba(stage_model, X_stage)

    out = {
        "region": region,
        "date": date,
        "bloom_flag": "Bloom" if bloom == 1 else "NoBloom",
        "bloom_prob": round(float(gate_probs[0]), 6),
        "bloom_stage": stage_label,
        "stage_prob": round(float(stage_probs[0]), 6),
    }

    if debug:
        out["debug_info"] = {
            "input_features": list(df.columns),
            "gate_expected": list(getattr(gate_model, "feature_names_in_", [])),
            "stage_expected": list(getattr(stage_model, "feature_names_in_", [])),
            "X_gate_cols": list(X_gate.columns),
            "X_stage_cols": list(X_stage.columns),
            "types": {c: str(df[c].dtype) for c in df.columns},
        }

    return out

def predict_many(
    gate_model: BaseEstimator,
    stage_model: BaseEstimator,
    batch_inputs: List[Dict[str, Any]],
    prob_threshold: float = 0.5,
    debug: bool = False
) -> Dict[str, Any]:
    items = []
    for item in batch_inputs:
        r = predict_one(
            gate_model=gate_model,
            stage_model=stage_model,
            date=item["date"],
            region=item["region"],
            features=item["features"],
            prob_threshold=prob_threshold,
            debug=debug
        )
        items.append(r)
    return {"items": items}
