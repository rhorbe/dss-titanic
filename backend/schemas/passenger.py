from pydantic import BaseModel, Field

class PassengerBase(BaseModel):
    pClass: int = Field(..., alias='pClass', description="Passenger class (1 = 1st, 2 = 2nd, 3 = 3rd)", ge=1, le=3)
    name: str = Field(..., alias='name', description="Full name of the passenger", min_length=1)
    sex: str = Field(..., alias='sex', description="Gender of the passenger", pattern='^[MF]$')
    age: float = Field(..., alias='age', description="Age of the passenger in years", ge=1)
    sibSp: int = Field(..., alias='sibSp', description="Number of siblings/spouses aboard")
    parch: int = Field(..., alias='parch', description="Number of parents/children aboard")
    fare: float = Field(..., alias='fare', description="Ticket fare paid by the passenger", ge=1)
    cabin: int = Field(..., alias='cabin', description="Cabin number", ge=1)
    embarked: str = Field(..., alias='embarked', description="Port of embarkation (C = Cherbourg, Q = Queenstown, S = Southampton)", pattern='^[CQS]$')
    ticket_number: int = Field(..., alias='ticket_number', description="Ticket number", ge=1)

class PassengerPredictionRequest(PassengerBase):
    pass

class PassengerPredictionResponse(PassengerBase):
    survived: bool = Field(..., description="Survival status of the passenger")