import React, { useEffect, useState } from "react";
import EChart from "../EChart";

export default function ParentsChildrenDistributionCount() {
  const [option, setOption] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/metrics/survival/parents_children_count")
      .then(r => r.json())
      .then(json => {
        setOption({
          title: { left: "center" },
          tooltip: { trigger: "axis" },
          legend: { top: 30 },
          xAxis: {
            type: "category",
            data: json.labels,
            name: "Cantidad"
          },
          yAxis: { type: "value", name: "Pasajeros" },
          series: [
            {
              name: "Hombres",
              type: "bar",
              data: json.male,
              label: {
                show: true,
                position: "top",
                formatter: "{c}"
              }
            },
            {
              name: "Mujeres",
              type: "bar",
              data: json.female,
              label: {
                show: true,
                position: "top",
                formatter: "{c}"
              }
            }
          ]
        });
      });
  }, []);

  if (!option) return <div>Cargando...</div>;
  return <EChart option={option} />;
}
