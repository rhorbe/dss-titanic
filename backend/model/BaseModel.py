from abc import ABC, abstractmethod

class BaseModel(ABC):
    @abstractmethod
    def train(self, X, y):
        pass

    @abstractmethod
    def validate(self, X, y):
        pass

    @abstractmethod
    def predict(self, X):
        pass

    def plot_confusion_matrix(self):
        pass

    def plot_roc_curve(self):
        pass

    def save_model(self, model_path):
        pass
    
