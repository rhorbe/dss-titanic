import ReactECharts from "echarts-for-react";

export default function EChart({ option }) {
  return (
    <ReactECharts
      option={option}
      style={{ height: "450px", width: "100%" }}
    />
  );
}