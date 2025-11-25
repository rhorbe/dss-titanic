import React, { useEffect, useState } from "react";
import EChart from "../EChart";

export default function AgeDistribution() {
  const [option, setOption] = useState(null);
  const [error, setError] = useState(null);

  // --- función para suavizar la curva ---
  function smoothCurve(values, windowSize = 5) {
    const smoothed = [];
    for (let i = 0; i < values.length; i++) {
      let start = Math.max(0, i - windowSize);
      let end = Math.min(values.length - 1, i + windowSize);
      let slice = values.slice(start, end + 1);
      let avg = slice.reduce((a, b) => a + b, 0) / slice.length;
      smoothed.push(avg);
    }
    return smoothed;
  }

  useEffect(() => {
    fetch("http://localhost:8000/metrics/general/age")
      .then((r) => r.json())
      .then((json) => {
        const payload = json.age_hist || { bins: [], counts: [] };

        const x = payload.bins.map(Number);
        const y = payload.counts.map(Number);

        // --- aplicar suavizado ---
        const ySmooth = smoothCurve(y, 4);

        setOption({
          title: { left: "center"},
          tooltip: { trigger: "axis" },
          xAxis: { type: "category", data: x, name: "Edad" },
          yAxis: { type: "value", name: "Cantidad" },
          legend: { top: 20 },

          series: [
            {
              name: "Histograma",
              type: "bar",
              data: y,
              itemStyle: { opacity: 0.6 }
            },
            {
              name: "Tendencia",
              type: "line",
              data: ySmooth,
              smooth: true,
              lineStyle: { width: 3 }
            }
          ]
        });
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div className="text-danger">Error: {error}</div>;
  if (!option) return <div>Cargando...</div>;
  return <EChart option={option} />;
}
