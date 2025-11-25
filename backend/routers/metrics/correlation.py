import pandas as pd
from fastapi import APIRouter
from core.data_loader import load_cleaned_data

router = APIRouter(prefix="/metrics/correlation", tags=["Correlation"])


@router.get("/correlation_matrix")
def correlation_matrix():
    df = load_cleaned_data()

    cols = ["Age", "Fare", "Pclass", "SibSp", "Parch", "Survived"]
    corr = df[cols].corr().round(3)

    corr = corr.fillna(0)  # ← IMPORTANTE

    return {
        "labels": corr.columns.tolist(),
        "matrix": corr.values.tolist()
    }


@router.get("/by_class_sex")
def survival_by_class_sex():
    df = load_cleaned_data()
    df["Sex"] = df["Sex"].replace({1: "male", 0: "female"})
    pivot = df.pivot_table(values="Survived", index="Pclass", columns="Sex", aggfunc="mean")
    return pivot.fillna(0).to_dict()

@router.get("/by_age_sex")
def survival_by_age_sex():
    df = load_cleaned_data()
    df["Sex"] = df["Sex"].replace({1: "male", 0: "female"})
    
    df = df.dropna(subset=["Age"])

    bins = list(range(0, 85, 5))
    df["AgeBin"] = pd.cut(df["Age"], bins=bins, right=False)

    pivot = df.pivot_table(values="Survived", index="AgeBin", columns="Sex", aggfunc="mean")

    pivot = pivot.fillna(0)
    return {
        "bins": [str(i) for i in pivot.index.astype(str)],
        "male": pivot["male"].round(3).tolist() if "male" in pivot else [],
        "female": pivot["female"].round(3).tolist() if "female" in pivot else []
    }

