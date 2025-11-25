import React, { useEffect, useState } from "react";
import EChart from "../EChart";

export default function SurvivedDistribution() {
  const [option, setOption] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/metrics/survival/global")
      .then((r) => r.json())
      .then((json) => {
        const labels = ["Sobrevivió", "No sobrevivió"];
        const values = [json.survived, json.not_survived];

        // Total para porcentajes
        const total = values.reduce((a, b) => a + b, 0);

        // Convertimos a porcentaje
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
          xAxis: {
            type: "category",
            data: labels
          },
          yAxis: {
            type: "value",
            name: "Porcentaje",
            axisLabel: { formatter: "{value}%" }
          },
          series: [
            {
              type: "bar",
              data: percentages,
              label: {
                show: true,
                position: "top",
                formatter: (item) => `${item.value.toFixed(1)}%`
              }
            }
          ]
        });
      });
  }, []);

  if (!option) return <div>Cargando...</div>;
  return <EChart option={option} />;
}
