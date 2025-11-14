from pydantic import BaseModel, Field

class PassengerBase(BaseModel):
    pClass: int = Field(..., alias='Pclass', description="Passenger class (1 = 1st, 2 = 2nd, 3 = 3rd)")
    name: str = Field(..., alias='Name', description="Full name of the passenger")
    sex: str = Field(..., alias='Sex', description="Gender of the passenger")
    age: float = Field(..., alias='Age', description="Age of the passenger in years")
    sibSp: int = Field(..., alias='SibSp', description="Number of siblings/spouses aboard")
    parch: int = Field(..., alias='Parch', description="Number of parents/children aboard")
    fare: float = Field(..., alias='Fare', description="Ticket fare paid by the passenger")
    cabin: str = Field(None, alias='Cabin', description="Cabin number")
    embarked: str = Field(..., alias='Embarked', description="Port of embarkation (C = Cherbourg, Q = Queenstown, S = Southampton)")
    ticket_number: str = Field(..., alias='Ticket', description="Ticket number")


class PassengerPredictionRequest(PassengerBase):
    pass

class PassengerPredictionResponse(PassengerBase):
    survived: bool = Field(..., description="Survival status of the passenger")