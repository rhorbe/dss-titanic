from tensorflow.keras.models import load_model
from backend.model.SKLearnModel import SKLearnModel
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score,
    f1_score, confusion_matrix, roc_curve, auc, classification_report
)

class KerasModel(SKLearnModel):
    def __init__(
        self,
        build_fn=None,
        model_path=None,
        name="Keras Neural Network"
    ):
        """
        build_fn: función que construye un modelo Keras si no existe un .h5
        model_path: ruta del modelo guardado (.h5)
        """
        self.build_fn = build_fn

        if model_path:
            self.model = load_model(model_path)
        elif build_fn:
            self.model = build_fn()
        else:
            raise ValueError("Debes pasar build_fn o model_path")

        super().__init__(model=self.model, name=name)

        # para guardar métricas del último test
        self.last_y_true = None
        self.last_y_pred = None
        self.last_y_prob = None

    def train(self, X_train, y_train, epochs=50, batch_size=32):
        history = self.model.fit(
            X_train,
            y_train,
            epochs=epochs,
            batch_size=batch_size,
            verbose=0
        )

        self.fitted = True

        return history
    
    def validate(self, X_test, y_test):
        # Probabilidades de salida de la RNA
        probs = self.model.predict(X_test).reshape(-1)

        # Convertir a clases 0/1
        preds = (probs >= 0.5).astype(int)

        # Guardar los valores que usa la clase base SKLearnModel
        self.y_test = y_test
        self.y_pred = preds
        self.y_proba = probs

        # (Opcional, si querés conservar "historial" específico de KerasModel)
        self.last_y_true = y_test
        self.last_y_pred = preds
        self.last_y_prob = probs

        # Métricas
        metrics = {
            "accuracy": accuracy_score(y_test, preds),
            "precision": precision_score(y_test, preds),
            "recall": recall_score(y_test, preds),
            "f1": f1_score(y_test, preds),
            "cm": confusion_matrix(y_test, preds),
            "report": classification_report(y_test, preds)
        }

        return metrics

    def predict(self, X):
        prob = self.model.predict(X, verbose=0).flatten()
        pred = (prob >= 0.5).astype(int)

        self.last_y_prob = prob
        self.last_y_pred = pred

        return pred
    
    def save_model(self, model_path):
        self.model.save(model_path)
        print(f"[OK] Modelo guardado en {model_path}")


