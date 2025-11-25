import React, { useEffect, useState } from "react";
import EChart from "../EChart";

export default function SurvivalAgeSexHeatmap() {
  const [option, setOption] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/metrics/correlation/by_age_sex")
      .then(r => r.json())
      .then(json => {
        const sexes = ["male", "female"];
        const bins = json.bins;

        const matrix = [];
        bins.forEach((bin, rowIndex) => {
          sexes.forEach((sex, colIndex) => {
            matrix.push([
              colIndex,
              rowIndex,
              json[sex][rowIndex] || 0
            ]);
          });
        });

        setOption({
          title: { text: "Supervivencia por Edad y Sexo", left: "center" },
          tooltip: {
            formatter: params =>
              `Sexo: ${sexes[params.value[0]]}<br>
               Edad: ${bins[params.value[1]]}<br>
               Supervivencia: ${(params.value[2] * 100).toFixed(1)}%`
          },
          xAxis: { type: "category", data: sexes, name: "Sexo" },
          yAxis: { type: "category", data: bins, name: "Edad" },
          visualMap: {
            min: 0,
            max: 1,
            calculable: true,
            inRange: { color: ["#2563eb", "#facc15", "#dc2626"] }
          },
          series: [{
            type: "heatmap",
            data: matrix,
            label: {
              show: true,
              formatter: p => `${(p.value[2] * 100).toFixed(0)}%`,
              color: "black",
              fontWeight: "bold"
            }
          }]
        });
      });
  }, []);

  if (!option) return <div>Cargando...</div>;
  return <EChart option={option} />;
}
