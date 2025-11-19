# predict.py
import pandas as pd
import joblib
from model.preprocesamiento import clean_and_prepare

def load_model(model_path="decision_tree_model.pkl"):
    return joblib.load(model_path)

def preprocess_new_passenger(passenger_dict):
    """
    Convierte un diccionario con los datos de un pasajero
    en un DataFrame con las mismas columnas que el entrenamiento.
    """

    # 1. Cargar X del dataset de entrenamiento (para obtener columnas correctas)
    df = clean_and_prepare("model/train.csv")

    y = df['Survived']
    X = df.drop("Survived", axis=1)

    # 2. Crear DataFrame del nuevo pasajero
    df_new = pd.DataFrame([passenger_dict])
    df_new = pd.get_dummies(df_new, columns=["Sex", "Embarked"])
    df_new = df_new.reindex(columns=X.columns, fill_value=0)
    df_new = df_new.astype(X.dtypes.to_dict())

    return df_new


def predict_passenger(passenger_dict):
    """
    Recibe un diccionario con los datos del pasajero
    y devuelve 0 (no sobrevivió) o 1 (sobrevivió).
    """
    model = load_model('model/decision_tree_model.pkl')
    X_new = preprocess_new_passenger(passenger_dict)
    prediction = model.predict(X_new)[0]

    return int(prediction)


if __name__ == "__main__":
    # Ejemplo de pasajero
    pasajero = {
        "Pclass": 1,
        "Sex": "male",
        "Age": 20,
        "SibSp": 0,
        "Parch": 0,
        "Fare": 70,
        "Embarked": "Q"
    }

    resultado = predict_passenger(pasajero)
    print("Sobrevivió?" , "Sí" if resultado == 1 else "No")