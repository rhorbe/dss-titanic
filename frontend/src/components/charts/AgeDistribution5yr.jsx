import React, { useEffect, useState } from "react";
import EChart from "../EChart";

export default function AgeDistribution5yr() {
  const [option, setOption] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/metrics/general/age_binned")
      .then((r) => r.json())
      .then((json) => {
        const payload = json.age_hist || { bins: [], counts: [] };

        const x = payload.bins;          // Ej: ["0-5", "5-10", ...]
        const y = payload.counts;        // Ej: [12, 19, 25, ...]

        // ---- CURVA SUAVE (Spline) ----
        // Convertimos los valores en puntos y usamos line smooth
        const smoothLineData = y.map((v, i) => [i, v]);

        setOption({
          tooltip: { trigger: "axis" },
          legend: { top: 10 },
          xAxis: {
            type: "category",
            data: x,
            name: "Edad (rango 5 años)",
            axisLabel: { rotate: 45 }
          },
          yAxis: { type: "value", name: "Cantidad" },
          series: [
            {
              name: "Frecuencia",
              type: "bar",
              data: y,
              barWidth: "65%",
              itemStyle: { opacity: 0.7 }
            },
            {
              name: "Tendencia",
              type: "line",
              data: smoothLineData.map(p => p[1]),
              smooth: true,
              lineStyle: {
                width: 3
              },
              symbol: "none"
            }
          ]
        });
      })
      .catch(() => {
        setOption({
          title: { left: "center" },
          xAxis: { type: "category", data: [] },
          yAxis: { type: "value" },
          series: [{ type: "bar", data: [] }]
        });
      });
  }, []);

  if (!option) return <div>Cargando...</div>;
  return <EChart option={option} />;
}
