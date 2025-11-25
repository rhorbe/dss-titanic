# predict.py
from sklearn.discriminant_analysis import StandardScaler
from config.config import ROOT_DIR, X_TRAIN_PATH
import pandas as pd
import joblib


def load_model(model_path="decision_tree_model.pkl"):
    return joblib.load(model_path)

def apply_preprocess(df):
    """
    Aplica el mismo preprocesamiento que se usó en el entrenamiento
    a un DataFrame de pandas.
    """
    
    new_extended = df.copy()
    new_extended["FamilySize"] = new_extended["SibSp"] + new_extended["Parch"] + 1
    new_extended["IsAlone"] = (new_extended["FamilySize"] == 1).astype(int)

    new_extended["Sex"] = new_extended["Sex"].map({"male": 0, "female": 1})

    cat_cols = ["Embarked", "Pclass"]
    new_extended["Pclass"] = new_extended["Pclass"].astype("category")
    new_extended = pd.get_dummies(new_extended, columns=cat_cols)

    cols_to_scale = ["Age", "SibSp", "Parch", "Fare", "FamilySize"]
    scaler = joblib.load(f'{ROOT_DIR}\\model\\scaler_titanic.pkl')
    new_extended[cols_to_scale] = scaler.transform(new_extended[cols_to_scale])

    feature_columns = pd.read_csv(X_TRAIN_PATH).columns
    for col in feature_columns:
        if col not in new_extended.columns:
            new_extended[col] = 0

    new_extended = new_extended[feature_columns]
    return new_extended
    
def preprocess_new_passenger(passenger_dict):
    """
    Convierte un diccionario con los datos de un pasajero
    en un DataFrame con las mismas columnas que el entrenamiento.
    """
    df = pd.DataFrame([passenger_dict])
    df_processed = apply_preprocess(df)
    return df_processed


def predict_passenger(passenger_dict):
    """
    Recibe un diccionario con los datos del pasajero
    y devuelve 0 (no sobrevivió) o 1 (sobrevivió).
    """
    model = load_model(f'{ROOT_DIR}\\model\\svm\\svm_titanic.pkl')
    X_new = preprocess_new_passenger(passenger_dict)

    probabilities = model.predict_proba(X_new)
    prediction = model.predict(X_new)[0]
    
    return {
        "survived": int(prediction),
        "probability_not_survived": probabilities[0][0],
        "probability_survived": probabilities[0][1]
    }   
