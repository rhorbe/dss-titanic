from fastapi import APIRouter
from schemas.passenger import PassengerPredictionRequest, PassengerPredictionResponse
from model.predict import predict_passenger

router = APIRouter(
    prefix="/predict",
    tags=["prediction"],
    responses={404: {"description": "Not found"}},
)

@router.post("/", response_model=PassengerPredictionResponse)
def predict_survival(passenger: PassengerPredictionRequest):

    passenger_dict = passenger.model_dump(by_alias=True)
    aux_dict = {
        "Pclass": passenger_dict.get("pClass"),
        "Sex": passenger_dict.get("sex"),
        "Age": passenger_dict.get("age"),
        "SibSp": passenger_dict.get("sibSp", 0),
        "Parch": passenger_dict.get("parch", 0),
        "Fare": passenger_dict.get("fare"),
        "Embarked": passenger_dict.get("embarked")
    }

    prediction = predict_passenger(aux_dict)

    passengerPredictionResponse = PassengerPredictionResponse(
        pClass=passenger_dict.get("pClass", 0),
        name=passenger_dict.get("name", ""),
        sex=passenger_dict.get("sex", ""),
        age=passenger_dict.get("age", 0),
        sibSp=passenger_dict.get("sibSp", 0),
        parch=passenger_dict.get("parch", 0),
        fare=passenger_dict.get("fare", 0.0),
        cabin=passenger_dict.get("cabin", ""),
        embarked=passenger_dict.get("embarked", ""),
        ticket_number=passenger_dict.get("ticket_number", ""),
        survived=bool(prediction)
    )

    return passengerPredictionResponse