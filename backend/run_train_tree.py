from model.arbol.arbol_decision import train_decision_tree

if __name__ == "__main__":
    print("Entrenando el modelo de árbol de decisión...")
    train_decision_tree()
    print("Modelo entrenado y guardado como 'decision_tree_model.pkl'.")