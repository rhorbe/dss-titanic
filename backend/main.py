from fastapi import FastAPI
from routers import prediction

app = FastAPI(
    title="Titanic Survival Prediction API",
    description="An API to predict the survival of Titanic passengers based on their attributes.",
    version="1.0.0",
)

app.include_router(prediction.router)