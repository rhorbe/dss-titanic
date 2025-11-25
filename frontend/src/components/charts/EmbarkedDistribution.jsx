import React, { useEffect, useState } from "react";
import EChart from "../EChart";

export default function EmbarkedDistribution() {
  const [option, setOption] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/metrics/general/embarked")
      .then((r) => r.json())
      .then((json) => {
        const labels = json.labels || [];
        const values = json.values || [];

        // Calcular porcentajes
        const total = values.reduce((a, b) => a + b, 0);
        const perc = total > 0 ? values.map(v => (v / total) * 100) : values;

        setOption({
          title: { left: "center" },
          tooltip: {
            trigger: "item",
            formatter: p => `${p.name}: ${p.value.toFixed(2)}%`
          },
          xAxis: { type: "category", data: labels },
          yAxis: {
            type: "value",
            axisLabel: { formatter: v => `${v}%` }
          },
          series: [
            {
              type: "bar",
              data: perc,
              label: {
                show: true,
                position: "top",
                formatter: (params) => `${params.value.toFixed(2)}%`
              }
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
