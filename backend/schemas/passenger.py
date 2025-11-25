from typing import Optional
from pydantic import BaseModel, Field

class PassengerBase(BaseModel):
    pClass: int = Field(..., alias='pClass', description="Passenger class (1 = 1st, 2 = 2nd, 3 = 3rd)", ge=1, le=3)
    sex: str = Field(..., alias='sex', description="Gender of the passenger", pattern='^(male|female)$')
    age: int = Field(..., alias='age', description="Age of the passenger in years", ge=1)
    sibSp: Optional[int] = Field(None, alias='sibSp', description="Number of siblings/spouses aboard")
    parch: Optional[int] = Field(None, alias='parch', description="Number of parents/children aboard")
    fare: int = Field(..., alias='fare', description="Ticket fare paid by the passenger", ge=1)
    embarked: str = Field(..., alias='embarked', description="Port of embarkation (C = Cherbourg, Q = Queenstown, S = Southampton)", pattern='^[CQS]$')

class PassengerPredictionRequest(PassengerBase):
    pass

class PassengerPredictionResponse(PassengerBase):
    survived: bool = Field(..., description="Survival status of the passenger")
    probability_survived: float = Field(..., description="Probability of survival")
    probability_not_survived: float = Field(..., description="Probability of not surviving")