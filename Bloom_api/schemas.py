# ============================================================
# File: Bloom_api/schemas.py
# Purpose: Pydantic schemas for requests & responses
# Author: BloomWatch
# ============================================================

from __future__ import annotations
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field

# 🧾 Single predict request
class PredictQuery(BaseModel):
    # أساسيّات
    region: str = Field(..., examples=["California"])
    date: str   = Field(..., examples=["2024-04-15"])  # ISO date

    # متغيرات المناخ (اسم عادي أو *_final مقبول)
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

    # إعدادات
    prob_threshold: float = 0.5
    debug: bool = False

# 📦 Batch predict request
class PredictBatchQuery(BaseModel):
    cases: List[PredictQuery]
    prob_threshold: float = 0.5
    debug: bool = False

# ✅ Single predict response
class PredictResponse(BaseModel):
    region: str
    date: str
    bloom_flag: str
    bloom_prob: float
    bloom_stage: str
    stage_prob: float
    debug_info: Optional[Dict[str, Any]] = None

# 📦 Batch response
class PredictBatchResponse(BaseModel):
    items: List[PredictResponse]
