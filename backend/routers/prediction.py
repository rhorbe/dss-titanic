from fastapi import APIRouter
from schemas.passenger import PassengerPredictionRequest, PassengerPredictionResponse

router = APIRouter(
    prefix="/predict",
    tags=["prediction"],
    responses={404: {"description": "Not found"}},
)

@router.post("/", response_model=PassengerPredictionResponse)
def predict_survival(passenger: PassengerPredictionRequest):
    return PassengerPredictionResponse(
        pClass=passenger.pClass,
        name=passenger.name,
        sex=passenger.sex,
        age=passenger.age,
        sibSp=passenger.sibSp,
        parch=passenger.parch,
        fare=passenger.fare,
        cabin=passenger.cabin,
        embarked=passenger.embarked,
        ticket_number=passenger.ticket_number,
        survived=True  # Placeholder logic for prediction
    )