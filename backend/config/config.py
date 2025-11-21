import os

# Ruta absoluta del directorio raíz del proyecto
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))

# Si config/ está en el root, entonces ROOT_DIR es el root verdadero.
# Si está dentro de otra carpeta, se ajusta así:
ROOT_DIR = os.path.abspath(os.path.join(ROOT_DIR, ".."))

# Rutas absolutas a datasets
DATA_DIR = os.path.join(ROOT_DIR, "..\\data")

X_TRAIN_PATH = os.path.join(DATA_DIR, "train\\X_train_scaled.csv")
Y_TRAIN_PATH = os.path.join(DATA_DIR, "train\\y_train.csv")

X_VALID_PATH = os.path.join(DATA_DIR, "test\\X_valid_scaled.csv")
Y_VALID_PATH = os.path.join(DATA_DIR, "test\\y_valid.csv")
