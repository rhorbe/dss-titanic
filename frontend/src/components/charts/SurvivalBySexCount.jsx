import React, { useEffect, useState } from "react";
import EChart from "../EChart";

export default function SurvivalBySexCount() {
  const [option, setOption] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/metrics/survival/by_sex_count")
      .then((r) => r.json())
      .then((json) => {
        const sexes = Object.keys(json);

        const survived = sexes.map(s => json[s].survived);
        const notSurvived = sexes.map(s => json[s].not_survived);

        setOption({
          title: { left: "center" },
          tooltip: { trigger: "axis" },
          legend: { top: 30 },
          xAxis: { type: "category", data: sexes, name: "Sexo" },
          yAxis: { type: "value", name: "Cantidad" },
          series: [
            {
              name: "Sobrevivieron",
              type: "bar",
              data: survived,
              label: {
                show: true,
                position: "top",
                formatter: (item) => item.value  // ← muestra valor arriba
              }
            },
            {
              name: "No sobrevivieron",
              type: "bar",
              data: notSurvived,
              label: {
                show: true,
                position: "top",
                formatter: (item) => item.value
              }
            }
          ]
        });
      });
  }, []);

  if (!option) return <div>Cargando...</div>;
  return <EChart option={option} />;
}
