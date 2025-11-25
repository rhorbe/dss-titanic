import React, { useEffect, useState } from "react";
import EChart from "../EChart";

export default function CorrelationMatrix() {
  const [option, setOption] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/metrics/correlation/correlation_matrix")
      .then(r => r.json())
      .then(json => {
        const labels = json.labels;
        const m = json.matrix;

        const heatmapData = [];
        labels.forEach((row, i) => {
          labels.forEach((col, j) => {
            heatmapData.push([j, i, m[i][j]]);
          });
        });

        setOption({
          title: { text: "Matriz de Correlación Multivariada", left: "center" },
          tooltip: { formatter: p => `${p.value[2]}` },
          xAxis: { type: "category", data: labels },
          yAxis: { type: "category", data: labels },
          visualMap: {
            min: -1,
            max: 1,
            calculable: true,
            inRange: { color: ["#2563eb", "#f8fafc", "#dc2626"] }
          },
          series: [{
            type: "heatmap",
            data: heatmapData,
            label: { show: true, color: "black", fontWeight: "bold" }
          }]
        });
      });
  }, []);

  if (!option) return <div>Cargando...</div>;
  return <EChart option={option} />;
}
