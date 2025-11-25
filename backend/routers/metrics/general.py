from fastapi import APIRouter
from core.data_loader import load_cleaned_data
import pandas as pd
import numpy as np
from scipy.stats import gaussian_kde

router = APIRouter(prefix="/metrics/general", tags=["General Metrics"])


@router.get("/age")
def age_distribution():
    df = load_cleaned_data()
    ages = df["Age"].dropna().values

    # Histograma
    counts, bins = np.histogram(ages, bins=80)

    # KDE (curva suave)
    kde = gaussian_kde(ages)
    xs = np.linspace(min(ages), max(ages), 200)
    ys = kde(xs)

    return {
        "age_hist": {
            "bins": bins.tolist(),
            "counts": counts.tolist()
        },
        "age_kde": {
            "xs": xs.tolist(),
            "ys": ys.tolist()
        }
    }


@router.get("/age_binned")
def age_binned():
    df = load_cleaned_data()

    ages = df["Age"].dropna()

    bins = list(range(0, 85, 5))
    counts, bin_edges = np.histogram(ages, bins=bins)

    # formateamos ej: "0-5", "5-10", etc
    labels = [f"{bin_edges[i]}-{bin_edges[i+1]}" for i in range(len(bin_edges)-1)]

    return {
        "age_hist": {
            "bins": labels,
            "counts": counts.tolist()
        }
    }


@router.get("/fare")
def fare_distribution():
    df = load_cleaned_data()

    # Convertir a numérico garantizar que no haya strings
    df["Fare"] = pd.to_numeric(df["Fare"], errors="coerce")

    # Filtrar NaN (si no, np.histogram explota)
    df = df.dropna(subset=["Fare"])

    # Ahora sí: histograma bien hecho
    counts, bin_edges = np.histogram(df["Fare"], bins=10)

    return {
        "fare_hist": {
            "bins": [f"{bin_edges[i]:.2f} - {bin_edges[i+1]:.2f}" for i in range(len(bin_edges)-1)],
            "counts": counts.tolist()
        }
    }

@router.get("/sex")
def sex_distribution():
    df = load_cleaned_data()

    sex_counts = df["Sex"].value_counts()

    result = {
        "male": int(sex_counts.get("male", 0)),
        "female": int(sex_counts.get("female", 0))
    }

    return {
        "labels": list(result.keys()),
        "values": list(result.values())
    }
@router.get("/class")
def class_distribution():
    df = load_cleaned_data()
    counts = df["Pclass"].value_counts().sort_index()
    return {
        "labels": counts.index.astype(str).tolist(),
        "values": counts.values.tolist()
    }


@router.get("/embarked")
def embarked_distribution():
    df = load_cleaned_data()

    embarked_counts = df["Embarked"].value_counts(dropna=False)

    embarked = {
        "Q": int(embarked_counts.get("Q", 0)),
        "S": int(embarked_counts.get("S", 0)),
        "C": int(embarked_counts.get("C", 0)),
    }

    return {
        "labels": list(embarked.keys()),
        "values": list(embarked.values())
    }

@router.get("/siblings_spouses")
def siblings_spouses_distribution():
    df = load_cleaned_data()
    counts = df["SibSp"].value_counts().sort_index()

    return {
        "labels": counts.index.astype(str).tolist(),
        "values": counts.values.tolist()
    }


@router.get("/parents_children")
def parents_children_distribution():
    df = load_cleaned_data()
    counts = df["Parch"].value_counts().sort_index()

    return {
        "labels": counts.index.astype(str).tolist(),
        "values": counts.values.tolist()
    }