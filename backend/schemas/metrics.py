from typing import Dict, List, Any
from pydantic import BaseModel

class Distribution(BaseModel):
    values: Dict[str, int]

class CorrelationMatrix(BaseModel):
    matrix: Dict[str, Dict[str, float]]

class SurvivalStats(BaseModel):
    survived: int
    not_survived: int