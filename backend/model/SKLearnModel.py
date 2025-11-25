import matplotlib.pyplot as plt
import seaborn as sns
from backend.model.BaseModel import BaseModel
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score,
    f1_score, confusion_matrix, roc_curve, auc, classification_report
)

class SKLearnModel(BaseModel):
    
    def __init__(self, model, name="Modelo"):
        self.model = model
        self.name = name
        self.fitted = False

    def train(self, X_train, y_train):
        self.model.fit(X_train, y_train)
        self.fitted = True
        print(f"[OK] {self.name} entrenado.")
        return self.model.score(X_train, y_train)

    def validate(self, X_test, y_test):
        if not self.fitted:
            raise Exception("Debe entrenar el modelo antes de evaluar.")
        
        self.X_test = X_test
        self.y_test = y_test
        self.y_pred = self.model.predict(X_test)

        # Probabilidades si están disponibles
        if hasattr(self.model, "predict_proba"):
            self.y_proba = self.model.predict_proba(X_test)[:, 1]
        elif hasattr(self.model, "decision_function"):
            self.y_proba = self.model.decision_function(X_test)
        else:
            self.y_proba = None

        # Métricas
        metrics = {
            "accuracy": accuracy_score(y_test, self.y_pred),
            "precision": precision_score(y_test, self.y_pred),
            "recall": recall_score(y_test, self.y_pred),
            "f1": f1_score(y_test, self.y_pred),
            "cm": confusion_matrix(y_test, self.y_pred),
            "report": classification_report(y_test, self.y_pred)
        }

        print("\n===== RESULTADOS =====")
        print(f"Accuracy: {metrics['accuracy']:.4f}")
        print(f"Precision: {metrics['precision']:.4f}")
        print(f"Recall: {metrics['recall']:.4f}")
        print(f"F1 Score: {metrics['f1']:.4f}")
        print("\nReporte completo:\n", metrics["report"])
        
        return metrics

    def plot_confusion_matrix(self):
        if not hasattr(self, "y_pred"):
            raise Exception("Debe ejecutar evaluate() primero.")
        
        cm = confusion_matrix(self.y_test, self.y_pred)

        plt.figure(figsize=(5, 4))
        sns.heatmap(cm, annot=True, fmt="d", cmap="Blues")
        plt.title(f"Matriz de confusión - {self.name}")
        plt.xlabel("Predicción")
        plt.ylabel("Real")
        plt.show()

    def plot_roc_curve(self):
        if self.y_proba is None:
            raise Exception("El modelo no soporta predict_proba ni decision_function.")

        fpr, tpr, _ = roc_curve(self.y_test, self.y_proba)
        roc_auc = auc(fpr, tpr)

        plt.figure(figsize=(5, 4))
        plt.plot(fpr, tpr, label=f"AUC = {roc_auc:.3f}")
        plt.plot([0,1], [0,1], linestyle='--')
        plt.title(f"Curva ROC - {self.name}")
        plt.xlabel("False Positive Rate")
        plt.ylabel("True Positive Rate")
        plt.legend()
        plt.show()

    def predict(self, X):
        if not self.fitted:
            raise Exception("Debe entrenar el modelo antes de predecir.")
        return self.model.predict(X)
