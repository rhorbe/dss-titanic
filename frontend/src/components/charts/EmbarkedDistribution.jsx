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

        setOption({
          title: { left: "center" },
          tooltip: {},
          xAxis: { type: "category", data: labels },
          yAxis: { type: "value" },
          series: [{ type: "bar", data: values }]
        });
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div className="text-danger">Error: {error}</div>;
  if (!option) return <div>Cargando...</div>;
  return <EChart option={option} />;
}
