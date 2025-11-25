from backend.model.SKLearnModel import SKLearnModel
from sklearn.tree import DecisionTreeClassifier
import joblib

class DecisionTree(SKLearnModel):
    
    def __init__(self, max_depth=None, class_weight=None, name="Árbol de Decisión"):
        model = DecisionTreeClassifier(
            max_depth=max_depth, 
            class_weight=class_weight, 
            random_state=42
        )
        super().__init__(model, name)

    def save_model(self, model_path=None):
        if model_path is None:
            model_path = "decision_tree_model.pkl"
        joblib.dump(self.model, model_path)
        print(f"[OK] Modelo guardado en {model_path}.")