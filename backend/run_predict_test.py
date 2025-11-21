from model.predict import predict_passenger

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
    print(f"Predicción de supervivencia: {resultado}")
    print("Sobrevivió?" , "Sí" if resultado == 1 else "No")
    