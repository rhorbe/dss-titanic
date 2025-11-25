from fastapi import FastAPI
from routers import prediction
from routers.metrics.general import router as general_metrics
from routers.metrics.survival import router as survival_metrics
from routers.metrics.correlation import router as correlation_metrics
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",   
]



app = FastAPI(
    title="Titanic Survival Prediction API",
    description="An API to predict the survival of Titanic passengers based on their attributes.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,       
    allow_credentials=True,
    allow_methods=["*"],         
    allow_headers=["*"],
)


app.include_router(prediction.router)
app.include_router(general_metrics)
app.include_router(survival_metrics)
app.include_router(correlation_metrics)