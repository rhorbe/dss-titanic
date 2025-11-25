import React, { useEffect, useState } from "react";
import EChart from "../EChart";

export default function FareDistribution() {
  const [option, setOption] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/metrics/general/fare")
      .then((r) => r.json())
      .then((json) => {
        const payload = json.fare_hist || { bins: [], counts: [] };
        setOption({
          title: { left: "center" },
          tooltip: { trigger: "axis" },
          xAxis: { type: "category", data: payload.bins, name: "Tarifa" },
          yAxis: { type: "value", name: "Cantidad" },
          series: [{ type: "bar", data: payload.counts }]
        });
      });
  }, []);

  if (!option) return <div>Cargando...</div>;
  return <EChart option={option} />;
}
