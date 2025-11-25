import React from "react";

export default function Models() {
  return (
    <div className="space-y-6 text-gray-200">
      <h1 className="text-3xl font-bold">Comparación de Modelos</h1>

      <p className="text-gray-400">
        Árbol de Decisión vs Random Forest vs Red Neuronal vs SVM (Support Vector Machine)
      </p>

      {/* ===========================
          RESUMEN GENERAL
      ============================ */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Resumen de Métricas</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-700 text-gray-300">
              <tr>
                <th className="p-3">Modelo</th>
                <th className="p-3">Accuracy</th>
                <th className="p-3">Precision</th>
                <th className="p-3">Recall</th>
                <th className="p-3">F1 Score</th>
                <th className="p-3">AUC</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700">
                <td className="p-3 font-semibold">SVM</td>
                <td className="p-3">0.8156</td>
                <td className="p-3">0.7647</td>
                <td className="p-3">0.7536</td>
                <td className="p-3">0.7591</td>
                <td className="p-3">0.842</td>
              </tr>

              <tr className="border-b border-gray-700">
                <td className="p-3 font-semibold">Random Forest</td>
                <td className="p-3">0.8156</td>
                <td className="p-3">0.7812</td>
                <td className="p-3">0.7246</td>
                <td className="p-3">0.7519</td>
                <td className="p-3">0.843</td>
              </tr>

              <tr className="border-b border-gray-700">
                <td className="p-3 font-semibold">Red Neuronal (RNA)</td>
                <td className="p-3">0.7989</td>
                <td className="p-3">0.7895</td>
                <td className="p-3">0.6522</td>
                <td className="p-3">0.7143</td>
                <td className="p-3">0.828</td>
              </tr>

              <tr>
                <td className="p-3 font-semibold">Árbol de Decisión</td>
                <td className="p-3">0.7877</td>
                <td className="p-3">0.7460</td>
                <td className="p-3">0.6812</td>
                <td className="p-3">0.7121</td>
                <td className="p-3">0.767</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ===========================
          ANALISIS DETALLADO
      ============================ */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md space-y-6">
        <h2 className="text-xl font-bold">Análisis de Resultados</h2>

        {/* SVM */}
        <div>
          <h3 className="text-lg font-semibold text-blue-300">SVM (Mejor Modelo)</h3>
          <p className="text-gray-300 mt-2">
            SVM fue el modelo más equilibrado:
          </p>
          <ul className="list-disc ml-6 text-gray-400 mt-1">
            <li>Mejor F1-Score (0.7591)</li>
            <li>Mejor Recall (0.7536): detectó más supervivientes reales</li>
            <li>Empató en Accuracy con Random Forest</li>
            <li>Matriz de confusión más equilibrada (16 FP / 17 FN)</li>
            <li>Excelente generalización para datasets pequeños</li>
          </ul>
        </div>

        {/* Random Forest */}
        <div>
          <h3 className="text-lg font-semibold text-green-300">Random Forest</h3>
          <p className="text-gray-300 mt-2">Casi igual de bueno que SVM:</p>
          <ul className="list-disc ml-6 text-gray-400 mt-1">
            <li>Mejor AUC (0.843)</li>
            <li>Alta precisión al predecir supervivientes</li>
            <li>Algo peor recuperando supervivientes reales (Recall)</li>
          </ul>
        </div>

        {/* RNA */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-300">Red Neuronal Artificial (RNA)</h3>
          <ul className="list-disc ml-6 text-gray-400 mt-1">
            <li>Alta precisión (0.7895)</li>
            <li>Bajo Recall (0.6522): demasiado conservadora</li>
            <li>No generaliza bien por el tamaño pequeño del dataset</li>
          </ul>
        </div>

        {/* Decision Tree */}
        <div>
          <h3 className="text-lg font-semibold text-red-300">Árbol de Decisión</h3>
          <ul className="list-disc ml-6 text-gray-400 mt-1">
            <li>Peor rendimiento en la mayoría de métricas</li>
            <li>Tiende a sobreajustarse</li>
            <li>Random Forest lo mejora enormemente</li>
          </ul>
        </div>

        {/* Elección del modelo */}
        <div className="border-t border-gray-700 pt-4">
          <h2 className="text-xl font-bold text-purple-300">Conclusión Final: SVM es el Mejor Modelo</h2>

          <p className="mt-3 text-gray-300">
            Para el Titanic, lo más importante es **detectar correctamente a los supervivientes**.
          </p>

          <ul className="list-disc ml-6 text-gray-400 mt-1">
            <li>SVM detectó 52 supervivientes (el mejor)</li>
            <li>Random Forest detectó 50</li>
            <li>RNA solo 45</li>
          </ul>

          <p className="mt-3 text-gray-300">
            Además, SVM tiene el mejor balance entre **precisión**, **recall** y **generalización**, 
            siendo el más robusto y el que comete menos errores críticos.
          </p>
        </div>
      </div>
    </div>
  );
}
