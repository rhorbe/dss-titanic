import pandas as pd
import os
DATA_PATH = os.path.join(os.path.dirname(__file__), '..', '..', 'data', 'train.csv')

def load_cleaned_data():
    df = pd.read_csv(DATA_PATH)
    return df