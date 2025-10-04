# ============================================================
# File: bloom_tester.py
# Purpose: Minimal tester for the two ML models (gate + stage)
# ============================================================

from __future__ import annotations
from typing import Dict, Any, List, Tuple
import os, math, warnings, sys
import joblib
import pandas as pd

# 🗂️ Paths (تقدر تغيرهم أو تستخدم env variables)
GATE_PATH  = os.getenv("MODEL_GATE_PATH",  r"F:\Nasa project\Bloom_model\gate_bloom_binary.joblib")
STAGE_PATH = os.getenv("MODEL_STAGE_PATH", r"F:\Nasa project\Bloom_model\stage_multiclass.joblib")

_GATE_MODEL = None
_STAGE_MODEL = None

# ✨ الخصائص الأساسية
_BASE_KEYS = [
    "AirTemp_avg","AirTemp_max","AirTemp_min","Precipitation","Humidity_rel",
    "VaporPressureDeficit","Evapotranspiration_ref","SpecificHumidity",
    "SolarRadiation_sw","SurfacePressure"
]

def _canon_value(key: str, payload: Dict[str, Any]):
    if key in payload and payload[key] is not None:
        return payload[key]
    kf = f"{key}_final"
    if kf in payload and payload[kf] is not None:
        return payload[kf]
    return None

def _ensure_models_loaded():
    global _GATE_MODEL, _STAGE_MODEL
    if _GATE_MODEL is None:
        if not os.path.exists(GATE_PATH):
            raise FileNotFoundError(f"Gate model not found at {GATE_PATH}")
        _GATE_MODEL = joblib.load(GATE_PATH)
    if _STAGE_MODEL is None:
        if not os.path.exists(STAGE_PATH):
            raise FileNotFoundError(f"Stage model not found at {STAGE_PATH}")
        _STAGE_MODEL = joblib.load(STAGE_PATH)
    return _GATE_MODEL, _STAGE_MODEL

def _align_features(df: pd.DataFrame, model: Any, context=""):
    if hasattr(model, "feature_names_in_"):
        cols = list(model.feature_names_in_)
        missing = [c for c in cols if c not in df.columns]
        if missing:
            warnings.warn(f"Warning: Missing features for prediction {context}: {missing}")
        df = df.reindex(columns=cols, fill_value=0.0)
    return df

def _predict_proba_safe(model, X: pd.DataFrame):
    if hasattr(model, "predict_proba"):
        proba = model.predict_proba(X)
        if proba.shape[1] == 2:
            return model.classes_, proba[:,1].tolist()
        preds = proba.argmax(axis=1)
        return model.classes_, [proba[i, preds[i]] for i in range(len(preds))]
    return None, [1.0]*len(X)

def predict_one_case(date: str, region: str, prob_threshold=0.5, **kwargs):
    gate, stage = _ensure_models_loaded()
    record = {k: _canon_value(k, kwargs) for k in _BASE_KEYS}
    df = pd.DataFrame([{k:v for k,v in record.items() if v is not None}])

    X_gate = _align_features(df.copy(), gate, "(gate)")
    X_stage = _align_features(df.copy(), stage, "(stage)")

    _, gate_probs = _predict_proba_safe(gate, X_gate)
    gate_pred = [1 if p>=prob_threshold else 0 for p in gate_probs]

    stage_pred = stage.predict(X_stage)
    _, stage_probs = _predict_proba_safe(stage, X_stage)

    return pd.DataFrame({
        "region":[region],
        "date":[date],
        "bloom_flag":["Bloom" if gate_pred[0]==1 else "NoBloom"],
        "bloom_prob":[round(gate_probs[0],6)],
        "bloom_stage":[str(stage_pred[0])],
        "stage_prob":[round(stage_probs[0],6)]
    })

def predict_batch(cases: List[Dict[str,Any]], prob_threshold=0.5):
    results = []
    for c in cases:
        row = predict_one_case(c["date"], c["region"], prob_threshold, **{k:v for k,v in c.items() if k not in ("region","date")})
        results.append(row)
    return pd.concat(results, ignore_index=True)

# 🚀 Test run
if __name__=="__main__":
    print("\n--- Testing predict_one_case ---")
    one = predict_one_case(
        date="2024-04-15", region="California",
        AirTemp_avg=18.0, AirTemp_max=25.5, AirTemp_min=12.0,
        Precipitation=0.0, Humidity_rel=50, VaporPressureDeficit=1.5,
        Evapotranspiration_ref=4.0, SpecificHumidity=0.0070,
        SolarRadiation_sw=280, SurfacePressure=101.0
    )
    print(one.to_string(index=False))

    print("\n--- Testing predict_batch ---")
    batch_cases = [
        {
            "region": "California","date": "2024-04-18",
            "AirTemp_avg_final":19.0,"AirTemp_max_final":26.0,"AirTemp_min_final":13.0,
            "Precipitation_final":0.0,"Humidity_rel_final":55,"VaporPressureDeficit_final":1.6,
            "Evapotranspiration_ref_final":4.2,"SpecificHumidity_final":0.0075,
            "SolarRadiation_sw_final":290,"SurfacePressure_final":101.1,
        },
        {
            "region": "Arizona","date": "2024-03-10",
            "AirTemp_avg_final":15.0,"AirTemp_max_final":22.0,"AirTemp_min_final":9.0,
            "Precipitation_final":1.5,"Humidity_rel_final":60,"VaporPressureDeficit_final":1.0,
            "Evapotranspiration_ref_final":3.0,"SpecificHumidity_final":0.0060,
            "SolarRadiation_sw_final":200,"SurfacePressure_final":100.8,
        }
    ]
    many = predict_batch(batch_cases)
    print(many.to_string(index=False))
