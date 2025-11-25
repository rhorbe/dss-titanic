import React, { useEffect, useState } from "react";
import EChart from "../EChart";

export default function SibSpDistribution() {
  const [option, setOption] = useState(null);
  useEffect(() => {
    fetch("http://localhost:8000/metrics/general/siblings_spouses")
      .then((r) => r.json())
      .then((json) => {
        const x = json.labels || [];
        const y = json.values || [];
        setOption({
          title: { left: "center" },
          tooltip: {},
          xAxis: { type: "category", data: x },
          yAxis: { type: "value" },
          series: [{ type: "bar", data: y }]
        });
      });
  }, []);
  if (!option) return <div>Cargando...</div>;
  return <EChart option={option} />;
}