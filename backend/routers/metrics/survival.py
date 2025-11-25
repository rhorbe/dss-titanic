from fastapi import APIRouter
from core.data_loader import load_cleaned_data
import pandas as pd

router = APIRouter(prefix="/metrics/survival", tags=["Survival Metrics"])


@router.get("/global")
def survival_global():
    df = load_cleaned_data()

    if "Survived" not in df.columns:
        return {"error": "El dataset no contiene la columna 'Survived'."}

    survived = int(df["Survived"].sum())
    not_survived = int(len(df) - survived)

    return {"survived": survived, "not_survived": not_survived}


@router.get("/by_sex")
def survival_by_sex():
    df = load_cleaned_data()

    df = df[df["Sex"].notna()]  # evitar NaN

    return df.groupby("Sex")["Survived"].mean().to_dict()

@router.get("/by_sex_count")
def survival_by_sex_count():
    df = load_cleaned_data()

    # Convertimos la columna dummy a string
    df["Sex"] = df["Sex"].replace({1: "male", 0: "female"})

    grouped = df.groupby("Sex")["Survived"].value_counts().unstack(fill_value=0)

    # value_counts deja columnas 0 (no sobrevivió) y 1 (sobrevivió)
    result = {
        sex: {
            "survived": int(grouped.loc[sex].get(1, 0)),
            "not_survived": int(grouped.loc[sex].get(0, 0))
        }
        for sex in grouped.index
    }

    return result

@router.get("/by_class")
def survival_by_class():
    df = load_cleaned_data()
    return df.groupby("Pclass")["Survived"].mean().to_dict()


@router.get("/by_class_sex")
def survival_by_class_sex():
    df = load_cleaned_data()
    # Convertir Sex a texto
    df["Sex"] = df["Sex"].astype(str)

    # Obtener recuentos de sobrevivientes por clase y sexo
    grouped = df.groupby(["Pclass", "Sex"])["Survived"].sum().reset_index()

    # Formato adaptado al front
    return {
        "classes": sorted(df["Pclass"].unique().tolist()),
        "sexes": ["male", "female"],
        "data": [
            {
                "class": int(row["Pclass"]),
                "sex": row["Sex"],
                "count": int(row["Survived"])
            }
            for _, row in grouped.iterrows()
        ]
    }

@router.get("/by_embarked")
def survival_by_embarked():
    df = load_cleaned_data()

    df = df[df["Embarked"].notna()]  # evitar vacíos

    return df.groupby("Embarked")["Survived"].mean().to_dict()


@router.get("/by_embarked_count")
def survival_by_embarked_count():
    df = load_cleaned_data()

    # Usar la columna original Embarked del CSV
    df["Embarked"] = df["Embarked"].fillna("C")  # por si hay valores vacíos

    # Agregar sexo
    df["Sex"] = df["Sex"].replace({"male": "male", "female": "female"})

    # Agrupación por puerto + sexo + supervivencia
    result = (
        df.groupby(["Embarked", "Sex", "Survived"])
        .size()
        .reset_index(name="count")
    )

    return result.to_dict(orient="records")

@router.get("/siblings_spouses_count")
def siblings_spouses_count():
    df = load_cleaned_data()

    # Sex como string
    df["Sex"] = df["Sex"].astype(str)

    # Obtener valores únicos ordenados de SibSp
    bins = sorted(df["SibSp"].unique().tolist())

    result = {
        "labels": bins,
        "male": [],
        "female": []
    }

    for b in bins:
        subset = df[df["SibSp"] == b]

        result["male"].append(int((subset["Sex"] == "male").sum()))
        result["female"].append(int((subset["Sex"] == "female").sum()))

    return result

@router.get("/parents_children_count")
def parents_children_count():
    df = load_cleaned_data()

    df["Sex"] = df["Sex"].astype(str)

    bins = sorted(df["Parch"].unique().tolist())

    result = {
        "labels": bins,
        "male": [],
        "female": []
    }

    for b in bins:
        subset = df[df["Parch"] == b]

        result["male"].append(int((subset["Sex"] == "male").sum()))
        result["female"].append(int((subset["Sex"] == "female").sum()))

    return result
