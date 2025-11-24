from backend.model.SKLearnModel import SKLearnModel
from sklearn.svm import SVC
import joblib

class SVM(SKLearnModel):

    def __init__(self, C=1.0, kernel='rbf', gamma='scale', class_weight=None, name="Support Vector Machine"):
        model = SVC(
            C=C,
            kernel=kernel,
            gamma=gamma,
            class_weight=class_weight,
            probability=True,
            random_state=42
        )
        super().__init__(model, name)

    def save_model(self, model_path):
        joblib.dump(self.model, model_path)

    def load_model(self, model_path):
        self.model = joblib.load(model_path)