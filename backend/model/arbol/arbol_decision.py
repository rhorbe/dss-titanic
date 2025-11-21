from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score
from config.config import X_TRAIN_PATH, Y_TRAIN_PATH, X_VALID_PATH, Y_VALID_PATH, ROOT_DIR

import pandas as pd
import joblib

def train_decision_tree():
    
    X_train = pd.read_csv(X_TRAIN_PATH)
    y_train = pd.read_csv(Y_TRAIN_PATH).values.ravel()

    X_val = pd.read_csv(X_VALID_PATH)
    y_val = pd.read_csv(Y_VALID_PATH).values.ravel()

    clf = DecisionTreeClassifier(random_state=42)
    clf.fit(X_train, y_train)

    y_pred = clf.predict(X_val)
    accuracy = accuracy_score(y_val, y_pred)
    print(f"Validation Accuracy: {accuracy * 100:.2f}%")
    joblib.dump(clf, f'{ROOT_DIR}\\model\\arbol\\decision_tree_model.pkl')

if __name__ == "__main__":
    train_decision_tree()