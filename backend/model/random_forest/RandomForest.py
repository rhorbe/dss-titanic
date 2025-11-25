from sklearn.ensemble import RandomForestClassifier
from backend.model.SKLearnModel import SKLearnModel
import joblib

class RandomForest(SKLearnModel):
    
    def __init__(self, n_estimators=100, max_depth=None, min_samples_split=2, min_samples_leaf=1, class_weight=None, name="Random Forest"):
        model = RandomForestClassifier(
            n_estimators=n_estimators,
            max_depth=max_depth,
            min_samples_split=min_samples_split,
            min_samples_leaf=min_samples_leaf,
            class_weight=class_weight,
            random_state=42
        )
        super().__init__(model, name)

    def save_model(self, model_path=None):
        if model_path is None:
            model_path = f"{self.name.replace(' ', '_').lower()}.joblib"
        joblib.dump(self.model, model_path)
        print(f"[OK] Modelo guardado en {model_path}.")