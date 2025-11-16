import { Container, Row, Col } from "react-bootstrap";
import MetricCard from "../components/MetricCard";

export default function Metrics() {
  return (
    <Container>
      <h1 className="mb-4">Métricas del Dataset Titanic</h1>

      <Row className="g-4">
        <Col md={6} lg={4}>
          <MetricCard title="Supervivencia por Sexo" chartId="survivalBySex" />
        </Col>

        <Col md={6} lg={4}>
          <MetricCard title="Supervivencia por Clase" chartId="survivalByClass" />
        </Col>

        <Col md={6} lg={4}>
          <MetricCard title="Distribución de Edades" chartId="ageDist" />
        </Col>

        <Col md={6} lg={4}>
          <MetricCard title="Correlación" chartId="heatmap" />
        </Col>
      </Row>
    </Container>
  );
}
