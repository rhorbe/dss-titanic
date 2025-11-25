import React, { useEffect, useState } from "react";
import EChart from "../EChart";

export default function SurvivalClassSex() {
  const [option, setOption] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/metrics/survival/by_class_sex")
      .then((r) => r.json())
      .then((json) => {
        const classes = json.classes;
        const sexes = json.sexes;

        // Preparar series agrupadas
        const series = sexes.map((sex) => ({
          name: sex,
          type: "bar",
          data: classes.map((cls) => {
            const row = json.data.find(
              (d) => d.class === cls && d.sex === sex
            );
            return row ? row.count : 0;
          }),
          label: {
            show: true,
            position: "top"
          },
        }));

        setOption({
          title: { left: "center" },
          tooltip: { trigger: "axis" },
          legend: { top: 30 },
          xAxis: { type: "category", data: classes, name: "Clase" },
          yAxis: { type: "value", name: "Cantidad" },
          series,
        });
      });
  }, []);

  if (!option) return <div>Cargando...</div>;
  return <EChart option={option} />;
}