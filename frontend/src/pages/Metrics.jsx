import { Container, Row, Col } from "react-bootstrap";
import MetricCard from "../components/MetricCard";

export default function Metrics() {
  return (
    <Container>
      <h1 className="mb-4">Métricas del Dataset Titanic</h1>
      <hr className="my-5" />

      <h2 className="mb-4 mt-5">Métricas generales</h2>

      <Row className="g-4 mt-5">
        <Col xs={12} md={8} lg={8} className="mx-auto">
          <MetricCard title="Distribución de Edades" chartId="ageDist" />
        </Col>
        <Col xs={12} md={8} lg={8} className="mx-auto">
          <MetricCard title="Distribución de Edades (grupos de 5 años)" chartId="ageDist5yr" />
        </Col>
        <Col xs={12} md={8} lg={8} className="mx-auto">
          <MetricCard title="Distribución de Tarifas" chartId="fareDist" />
        </Col>

        <Col xs={12} md={8} lg={8} className="mx-auto">
          <MetricCard title="Distribución por Sexo" chartId="sexDist" />
        </Col>
        <Col xs={12} md={8} lg={8} className="mx-auto">
          <MetricCard title="Distribución por Clase" chartId="classDist" />
        </Col>
        <Col xs={12} md={8} lg={8} className="mx-auto">
          <MetricCard title="Distribución por Puerto de Embarque" chartId="embarkedDist" />
        </Col>
        <Col xs={12} md={8} lg={8} className="mx-auto">
          <MetricCard title="Distribución por Hermanos/Cónyuges a Bordo" chartId="sibspDist" />
        </Col>
        <Col xs={12} md={8} lg={8} className="mx-auto">
          <MetricCard title="Distribución por Padres/Hijos a Bordo" chartId="parchDist" />
        </Col>
      </Row>
      <hr className="my-5" />

      <h2 className="mb-4 mt-5">Métricas de supervivencia</h2>

      <Row className="g-4 mt-5">
        <Col xs={12} md={8} lg={8} className="mx-auto">
          <MetricCard title="Distribución de Supervivencia" chartId="survivedDist" />
        </Col>
        <Col xs={12} md={8} lg={8} className="mx-auto">
          <MetricCard title="Supervivencia por Sexo" chartId="survivalBySex" />
        </Col>
        <Col xs={12} md={8} lg={8} className="mx-auto">
          <MetricCard title="Supervivencia por Clase" chartId="survivalByClass" />
        </Col>
        <Col xs={12} md={8} lg={8} className="mx-auto">
          <MetricCard title="Supervivencia por Puerto de Embarque" chartId="survivalByEmbarked" />
        </Col>
        <Col xs={12} md={8} lg={8} className="mx-auto">
          <MetricCard title="Supervivencia por Clase y Sexo (recuento)" chartId="survivalClassSex" />
        </Col>
        <Col xs={12} md={8} lg={8} className="mx-auto">
          <MetricCard title="Supervivencia por Sexo (recuento)" chartId="survivalBySexCount" />
        </Col>
        <Col xs={12} md={8} lg={8} className="mx-auto">
          <MetricCard title="Supervivencia por Puerto de Embarque (recuento)" chartId="survivalByEmbarkedCount" />
        </Col>
        <Col xs={12} md={8} lg={8} className="mx-auto">
          <MetricCard title="Distribución de Hermanos/Esposos (recuento)" chartId="siblingsSpousesCount" />
        </Col>
        <Col xs={12} md={8} lg={8} className="mx-auto">
          <MetricCard title="Distribución de Padres/Hijos (recuento)" chartId="parentsChildrenCount" />
        </Col>
      </Row>
      <hr className="my-5" />

      <h2 className="mb-4 mt-5">Métricas correlativas</h2>

      <Row className="g-4 mt-5">
        <Col xs={12} md={8} lg={8} className="mx-auto">
          <MetricCard title="Mapa de Calor de Supervivencia por Clase y Sexo" chartId="survivalClassSexHeatmap" />
        </Col>

        <Col xs={12} md={8} lg={8} className="mx-auto">
          <MetricCard title="Mapa de Calor de Supervivencia por Edad y Sexo" chartId="correlationAgeSexHeatmap" />
        </Col>

        <Col xs={12} md={8} lg={8} className="mx-auto">
          <MetricCard title="Matriz de Correlación Multivariada" chartId="correlationMatrix" />
        </Col>
      </Row>


    </Container>
  );
}
