from typing import Optional
from pydantic import BaseModel, Field

class PassengerBase(BaseModel):
    pClass: int = Field(..., alias='pClass', description="Passenger class (1 = 1st, 2 = 2nd, 3 = 3rd)", ge=1, le=3)
    name: str = Field(..., alias='name', description="Full name of the passenger", min_length=1)
    sex: str = Field(..., alias='sex', description="Gender of the passenger", pattern='^[MF]$')
    age: float = Field(..., alias='age', description="Age of the passenger in years", ge=1)
    sibSp: Optional[int] = Field(None, alias='sibSp', description="Number of siblings/spouses aboard")
    parch: Optional[int] = Field(None, alias='parch', description="Number of parents/children aboard")
    fare: float = Field(..., alias='fare', description="Ticket fare paid by the passenger", ge=1)
    cabin: Optional[int] = Field(None, alias='cabin', description="Cabin number", ge=1)
    embarked: Optional[str] = Field(None, alias='embarked', description="Port of embarkation (C = Cherbourg, Q = Queenstown, S = Southampton)", pattern='^[CQS]$')
    ticket_number: Optional[int] = Field(None, alias='ticket_number', description="Ticket number", ge=1)

class PassengerPredictionRequest(PassengerBase):
    pass

class PassengerPredictionResponse(PassengerBase):
    survived: bool = Field(..., description="Survival status of the passenger")