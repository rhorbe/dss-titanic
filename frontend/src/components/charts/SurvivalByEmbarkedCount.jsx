import React, { useEffect, useState } from "react";
import EChart from "../EChart";

export default function SurvivalByEmbarkedCount() {
  const [option, setOption] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/metrics/survival/by_embarked_count")
      .then((r) => r.json())
      .then((json) => {
        const ports = ["C", "Q", "S"];

        const maleYes = [], maleNo = [];
        const femaleYes = [], femaleNo = [];

        ports.forEach((p) => {
          maleYes.push(json.find(r => r.Embarked === p && r.Sex === "male" && r.Survived === 1)?.count || 0);
          maleNo.push(json.find(r => r.Embarked === p && r.Sex === "male" && r.Survived === 0)?.count || 0);

          femaleYes.push(json.find(r => r.Embarked === p && r.Sex === "female" && r.Survived === 1)?.count || 0);
          femaleNo.push(json.find(r => r.Embarked === p && r.Sex === "female" && r.Survived === 0)?.count || 0);
        });

        const labelConfig = {
          show: true,
          position: "insideTop",
          formatter: (item) => item.value > 0 ? item.value : ""
        };

        setOption({
          title: { left: "center" },
          tooltip: { trigger: "axis" },
          legend: { top: 30 },
          xAxis: { type: "category", data: ports, name: "Puerto de embarque" },
          yAxis: { type: "value", name: "Cantidad" },
          series: [
            { name: "No (Male)", type: "bar", stack: "male", data: maleNo, label: labelConfig },
            { name: "Sí (Male)", type: "bar", stack: "male", data: maleYes, label: labelConfig },
            { name: "No (Female)", type: "bar", stack: "female", data: femaleNo, label: labelConfig },
            { name: "Sí (Female)", type: "bar", stack: "female", data: femaleYes, label: labelConfig }
          ]
        });
      });
  }, []);

  if (!option) return <div>Cargando...</div>;
  return <EChart option={option} />;
}
