import React from "react";
import { Card, Table } from "react-bootstrap";
import "../styles/models.css"; // 👈 CSS externo

export default function Models() {
  return (
    <div className="text-default">

      {/* Título principal */}
      <h1 className="titulo-principal mb-3">Comparación de Modelos</h1>

      <p className="text-muted subtitulo-principal">
        Árbol de Decisión vs Random Forest vs Red Neuronal vs SVM
      </p>

      {/* ============================
          RESUMEN DE MÉTRICAS
      ============================ */}
      <Card className="p-4 mb-4">
        <h2 className="titulo-seccion">Resumen de Métricas</h2>

        <Table striped bordered hover responsive className="mt-3">
          <thead>
            <tr>
              <th>Modelo</th>
              <th>Accuracy</th>
              <th>Precision</th>
              <th>Recall</th>
              <th>F1 Score</th>
              <th>AUC</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>SVM</strong></td>
              <td>0.8156</td>
              <td>0.7647</td>
              <td>0.7536</td>
              <td>0.7591</td>
              <td>0.842</td>
            </tr>
            <tr>
              <td><strong>Random Forest</strong></td>
              <td>0.8156</td>
              <td>0.7812</td>
              <td>0.7246</td>
              <td>0.7519</td>
              <td>0.843</td>
            </tr>
            <tr>
              <td><strong>Red Neuronal (RNA)</strong></td>
              <td>0.7989</td>
              <td>0.7895</td>
              <td>0.6522</td>
              <td>0.7143</td>
              <td>0.828</td>
            </tr>
            <tr>
              <td><strong>Árbol de Decisión</strong></td>
              <td>0.7877</td>
              <td>0.7460</td>
              <td>0.6812</td>
              <td>0.7121</td>
              <td>0.767</td>
            </tr>
          </tbody>
        </Table>
      </Card>

      {/* ============================
          ANÁLISIS DETALLADO
      ============================ */}
      <Card className="p-4 mb-4 ">
        <h2 className="titulo-seccion">Análisis de Resultados</h2>

        {/* SVM */}
        <div className="mt-4">
          <h3 className="titulo-modelo text-info">SVM (Mejor Modelo)</h3>
          <p className="texto-justificado">
            SVM fue el modelo más equilibrado:
          </p>
          <ul className="texto-justificado">
            <li>Mejor F1-Score (0.7591)</li>
            <li>Mejor Recall (0.7536): detectó más supervivientes reales</li>
            <li>Empató en Accuracy con Random Forest</li>
            <li>Matriz de confusión más equilibrada (16 FP / 17 FN)</li>
            <li>Excelente generalización para datasets pequeños</li>
          </ul>
        </div>

        {/* Random Forest */}
        <div className="mt-4">
          <h3 className="titulo-modelo text-success">Random Forest</h3>
          <p className="texto-justificado">Casi igual de bueno que SVM:</p>
          <ul className="texto-justificado">
            <li>Mejor AUC (0.843)</li>
            <li>Alta precisión prediciendo supervivientes</li>
            <li>Algo peor recuperando supervivientes reales</li>
          </ul>
        </div>

        {/* RNA */}
        <div className="mt-4">
          <h3 className="titulo-modelo text-warning">Red Neuronal Artificial (RNA)</h3>
          <ul className="texto-justificado">
            <li>Alta precisión (0.7895)</li>
            <li>Bajo Recall (0.6522): demasiado conservadora</li>
            <li>No generaliza bien por el tamaño del dataset</li>
          </ul>
        </div>

        {/* Decision Tree */}
        <div className="mt-4">
          <h3 className="titulo-modelo text-danger">Árbol de Decisión</h3>
          <ul className="texto-justificado">
            <li>Peor rendimiento general</li>
            <li>Tiene tendencia a sobreajustarse</li>
            <li>Random Forest lo mejora enormemente</li>
          </ul>
        </div>

        {/* Conclusión */}
        <div className="mt-4 pt-3 border-top border-secondary">
          <h2 className="titulo-seccion">
            Conclusión Final: SVM es el Mejor Modelo
          </h2>

          <p className="texto-justificado mt-3">
            Para el Titanic, lo más importante es <strong>detectar correctamente a los supervivientes</strong>.
          </p>

          <ul className="texto-justificado">
            <li>SVM detectó 52 supervivientes (el mejor)</li>
            <li>Random Forest detectó 50</li>
            <li>RNA solo 45</li>
          </ul>

          <p className="texto-justificado mt-3">
            SVM combina la mejor relación entre precisión, recall y generalización.
          </p>
        </div>
      </Card>
    </div>
  );
}
