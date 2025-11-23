import joblib
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from config.config import X_TRAIN_PATH, Y_TRAIN_PATH, X_VALID_PATH, Y_VALID_PATH, ROOT_DIR

def train_random_forest(n_estimators=100, max_depth=None, min_samples_split=2, min_samples_leaf=1):
    X_train = pd.read_csv(X_TRAIN_PATH)
    y_train = pd.read_csv(Y_TRAIN_PATH).values.ravel()

    X_val = pd.read_csv(X_VALID_PATH)
    y_val = pd.read_csv(Y_VALID_PATH).values.ravel()

    rf_clf = RandomForestClassifier(
        n_estimators=n_estimators, 
        max_depth=max_depth, 
        min_samples_split=min_samples_split, 
        min_samples_leaf=min_samples_leaf,
        class_weight='balanced',
        random_state=42
    )

    rf_clf.fit(X_train, y_train)

    y_pred = rf_clf.predict(X_val)
    accuracy = accuracy_score(y_val, y_pred)
    print(f"Validation Accuracy: {accuracy * 100:.2f}%")
    
    joblib.dump(rf_clf, f'{ROOT_DIR}\\model\\random_forest\\random_forest_model.pkl')