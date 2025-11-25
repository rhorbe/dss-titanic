import React, { useEffect, useState } from "react";
import EChart from "../EChart";

export default function SurvivalClassSexHeatmap() {
  const [option, setOption] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/metrics/correlation/by_class_sex")
      .then((r) => r.json())
      .then((json) => {
        const sexes = Object.keys(json); // ["male", "female"]
        const classes = Object.keys(json[sexes[0]]).sort((a, b) => Number(a) - Number(b));

        const matrix = [];
        classes.forEach((cls, rowIndex) => {
          sexes.forEach((sex, colIndex) => {
            matrix.push([colIndex, rowIndex, json[sex][cls]]);
          });
        });

        setOption({
          title: { left: "center", top: 10 },

          tooltip: {
            formatter: (params) =>
              `Sexo: ${sexes[params.value[0]]}<br>
               Clase: ${classes[params.value[1]]}<br>
               Supervivencia: ${(params.value[2] * 100).toFixed(1)}%`
          },

          xAxis: {
            type: "category",
            data: sexes,
            name: "Sexo",
            nameGap: 15
          },

          yAxis: {
            type: "category",
            data: classes,
            name: "Clase",
            nameGap: 15
          },

          visualMap: {
            min: 0,
            max: 1,
            calculable: true,
            orient: "vertical",
            left: "right",
            top: "center",
            precision: 2,
            inRange: {
              color: ["#2563eb", "#facc15", "#dc2626"]
            }
          },

          series: [
            {
              type: "heatmap",
              data: matrix,
              label: {
                show: true,
                formatter: p => `${(p.value[2] * 100).toFixed(0)}%`,
                color: "black",
                fontWeight: "bold"
              },
              emphasis: {
                itemStyle: {
                  borderColor: "#ddd",
                  borderWidth: 1
                }
              }
            }
          ]
        });
      });
  }, []);

  if (!option) return <div>Cargando...</div>;
  return <EChart option={option} />;
}
