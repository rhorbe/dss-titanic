import React, { useEffect, useState } from "react";
import EChart from "../EChart";

export default function SurvivalBySex() {
  const [option, setOption] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/metrics/survival/by_sex")
      .then((r) => r.json())
      .then((json) => {
        const labels = Object.keys(json);
        const values = Object.values(json);

        // Calcular total para calcular porcentajes
        const total = values.reduce((a, b) => a + b, 0);

        // Convertir valores a porcentaje (ej: 0.45 = 45)
        const percentages = values.map(v => (v / total) * 100);

        setOption({
          title: { left: "center" },
          tooltip: {
            trigger: "axis",
            formatter: (params) => {
              const p = params[0];
              return `${p.name}: ${p.value.toFixed(1)}%`;
            }
          },
          legend: { top: 30 },
          xAxis: { type: "category", data: labels, name: "Sexo" },
          yAxis: {
            type: "value",
            name: "Porcentaje",
            axisLabel: { formatter: '{value}%' }
          },
          series: [
            {
              type: "bar",
              data: percentages,
              label: {
                show: true,
                position: "top",
                formatter: (p) => `${p.value.toFixed(1)}%`
              }
            }
          ]
        });
      });
  }, []);

  if (!option) return <div>Cargando...</div>;
  return <EChart option={option} />;
}
