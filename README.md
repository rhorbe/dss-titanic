# 🛳️ Trabajo Final DSS – Titanic  
**Predicción de Supervivencia • Análisis Exploratorio • Comparación de Modelos de Machine Learning**

Este proyecto integra **backend (FastAPI)**, **frontend (React + Vite)** y **modelos de machine learning** aplicados al dataset del Titanic.  
Incluye:

- API REST para predicciones y métricas
- Visualizaciones interactivas (ECharts)
- Comparación de modelos (SVM, Random Forest, RNA, Decision Tree)
- Formulario interactivo para predecir supervivencia de un pasajero

---

## 📦 Requisitos previos

### **Backend**
- Python 3.10+
- pip
- venv (opcional pero recomendado)

### **Frontend**
- Node.js 20+
- npm

---

# 🚀 Cómo iniciar el proyecto

## 1️⃣ Iniciar la API (Backend – FastAPI)

1. Abrir una terminal y ubicarse en:

/backend


2. Crear (opcional) y activar un entorno virtual:

python -m venv venv

3. Instalar dependencias:

pip install -r requirements.txt

4. Ejecutar FastAPI:

uvicorn main:app --reload

El parámetro `--reload` reinicia automáticamente la API al detectar cambios.

La API quedará disponible en: http://localhost:8000

Con documentación interactiva en: http://localhost:8000/docs

---

## 2️⃣ Iniciar la interfaz (Frontend – React)

1. En otra terminal, ubicarse en:

/frontend

2. Instalar dependencias:

npm install

3. Ejecutar la aplicación:

La interfaz estará disponible en: http://localhost:5173

---

# 📊 Funcionalidades principales

### ✔️ **Formulario interactivo de pasajeros**
Permite ingresar datos como edad, clase, tarifa y puerto de embarque para obtener una predicción personalizada de supervivencia.

✔ Muestra:  
- Probabilidad de supervivencia  
- Imagen temática asociada  
- Barra gráfica de probabilidades (verde/rojo)

---

### ✔️ **Dashboard de métricas**
Incluye visualizaciones:

- Distribuciones (edad, sexo, clase, tarifa)
- Métricas de supervivencia (por sexo, clase, embarque)
- Mapas de calor y matriz de correlación
- Histogramas y heatmaps

---

### ✔️ **Comparación de Modelos de ML**
Modelos evaluados:

- **SVM** (mejor rendimiento general)
- Random Forest
- Red Neuronal
- Árbol de Decisión

Métricas mostradas:

- Accuracy  
- Precision  
- Recall  
- F1 Score  
- AUC  
- Análisis detallado de resultados

---

# 🛠️ Tecnologías utilizadas

### **Backend**
- FastAPI
- Scikit-learn
- Joblib
- Pandas / NumPy

### **Frontend**
- React + Vite
- React-Bootstrap
- ECharts

---

# 🙌 Autores

* Barea, Matías
* Santillán Andrés
* Orbe, Rafael
