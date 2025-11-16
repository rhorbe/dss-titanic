import { Card } from "react-bootstrap";

export default function MetricCard({ title, chartId }) {
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <div id={chartId} style={{ minHeight: "150px" }} className="mt-3">
          <p className="text-muted">Gráfico: {chartId}</p>
        </div>
      </Card.Body>
    </Card>
  );
}
