from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from preprocesamiento import clean_and_prepare
import joblib

def train_decision_tree():
    # 1. Preprocesar dataset
    df = clean_and_prepare("train.csv")

    y = df['Survived']
    X = df.drop("Survived", axis=1)

    # 2. Train-test split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    # 3. Crear modelo
    model = DecisionTreeClassifier(
        max_depth=5,
        random_state=42
    )

    # 4. Entrenar
    model.fit(X_train, y_train)

    # 5. Evaluar
    preds = model.predict(X_test)
    accuracy = accuracy_score(y_test, preds)
    print(f"Accuracy del Árbol de Decisión: {accuracy:.4f}")

    # 6. Guardar modelo entrenado
    joblib.dump(model, "decision_tree_model.pkl")
    print("Modelo guardado como decision_tree_model.pkl")

    return accuracy

if __name__ == "__main__":
    accuracy = train_decision_tree()
    print(f"Modelo entrenado con una precisión de: {accuracy:.4f}")