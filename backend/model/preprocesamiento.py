import pandas as pd
from sklearn.preprocessing import StandardScaler

def clean_and_prepare(file_path: str):
    df = pd.read_csv(file_path)

    # ---- Limpieza original ----
    df = df.drop(columns=["Cabin", "Name", "Ticket", "PassengerId"])
    df["Embarked"] = df["Embarked"].fillna("S")
    df["Age"] = df["Age"].fillna(df["Age"].median())
    df["Age"] = df["Age"].apply(lambda x: round(x) if x > 1 else 1)
    df["Fare"] = df["Fare"].fillna(df["Fare"].median())
    df["Fare"] = df["Fare"].apply(lambda x: round(x) if x > 1 else 1)

    # One-hot encoding y conversión de booleanos a enteros
    df = pd.get_dummies(df, columns=["Sex", "Embarked"], drop_first=True)
    boolean_columns = df.select_dtypes(include=['bool']).columns
    df[boolean_columns] = df[boolean_columns].astype(int)
    
    # Save cleaned data for debugging
    df.to_csv("cleaned_data.csv", index=False)

    return df