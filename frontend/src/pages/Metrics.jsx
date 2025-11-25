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
          <MetricCard title="Distribución de Edades" chartId="ageDist" textExplaination="" />
        </Col>
        <Col xs={12} md={8} lg={8} className="mx-auto">
          <MetricCard title="Distribución de Edades (grupos de 5 años)" chartId="ageDist5yr" textExplaination="Se observa que los datos de la Edad tienen una forma normal, ligeramente sesgada" />
        </Col>
        <Col xs={12} md={8} lg={8} className="mx-auto">
          <MetricCard title="Distribución de Tarifas" chartId="fareDist" textExplaination="La tarifa se encuentra completamente sesgada." />
        </Col>
        <Col xs={12} md={8} lg={8} className="mx-auto">
          <MetricCard title="Distribución por Sexo" chartId="sexDist" textExplaination="Hay una fuerte predominancia de hombres" />
        </Col>
        <Col xs={12} md={8} lg={8} className="mx-auto">
          <MetricCard title="Distribución por Clase" chartId="classDist" textExplaination="Amplia mayoría de pasajeros de 3ra clase. Tantos que hay más que de 1ra y 2da combinados." />
        </Col>
        <Col xs={12} md={8} lg={8} className="mx-auto">
          <MetricCard title="Distribución por Puerto de Embarque" chartId="embarkedDist" textExplaination="C = Cherbourg, Q = Queenstown, S = Southampton
            Amplia mayoría de pasajeros que embarcaron en Southampton.
            " />
        </Col>
        <Col xs={12} md={8} lg={8} className="mx-auto">
          <MetricCard title="Distribución por Hermanos/Cónyuges a Bordo" chartId="sibspDist" textExplaination="" />
        </Col>
        <Col xs={12} md={8} lg={8} className="mx-auto">
          <MetricCard title="Distribución por Padres/Hijos a Bordo" chartId="parchDist" textExplaination="" />
        </Col>
      </Row>
      <hr className="my-5" />

      <h2 className="mb-4 mt-5">Métricas de supervivencia</h2>

      <Row className="g-4 mt-5">
        <Col xs={12} md={8} lg={8} className="mx-auto">
          <MetricCard title="Distribución de Supervivencia" chartId="survivedDist" textExplaination="Se observa que fallecieron 549 pasajeros, lo que representa el 61.62% y sobrevivieron 342 que es un 38.38%." />
        </Col>
        <Col xs={12} md={8} lg={8} className="mx-auto">
          <MetricCard title="Supervivencia por Sexo" chartId="survivalBySex" textExplaination="Mujeres   74,2038%
            Hombres 18,8908%
            " />
        </Col>
        <Col xs={12} md={8} lg={8} className="mx-auto">
          <MetricCard title="Supervivencia por Sexo (recuento)" chartId="survivalBySexCount" />
        </Col>
        <Col xs={12} md={8} lg={8} className="mx-auto">
          <MetricCard title="Supervivencia por Clase" chartId="survivalByClass" textExplaination="Aqui se observa que la primera clase tiene la mayor tasa de supervivencia." />
        </Col>
        <Col xs={12} md={8} lg={8} className="mx-auto">
          <MetricCard title="Supervivencia por Puerto de Embarque" chartId="survivalByEmbarked" textExplaination="Cherbourg (C): 	55,3571%
            Queenstown (Q): 	38,9610%
            Southampton (S):	33,6957%"/>
        </Col>
        <Col xs={12} md={8} lg={8} className="mx-auto">
          <MetricCard title="Supervivencia por Puerto de Embarque (recuento)" chartId="survivalByEmbarkedCount" />
        </Col>
        <Col xs={12} md={8} lg={8} className="mx-auto">
          <MetricCard title="Supervivencia por Clase y Sexo (recuento)" chartId="survivalClassSex" textExplaination="Como se observa en el grafico las mujeres tuvieron la mayor tasa de supervivencia en cada una de las clases" />
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
          <MetricCard title="Mapa de Calor de Supervivencia por Clase y Sexo" chartId="survivalClassSexHeatmap" textExplaination="Se observa que es altamente probable sobrevivir siendo una mujer de clase alta y muy poco probable si se es un hombre de clase baja. Además que las mujeres de cualquier clase tenían mayores probabilidades que los hombres." />
        </Col>

        <Col xs={12} md={8} lg={8} className="mx-auto">
          <MetricCard title="Mapa de Calor de Supervivencia por Edad y Sexo" chartId="correlationAgeSexHeatmap" textExplaination="En este mapa de calor se puede ver que en caso de las mujeres a mayor edad hay más probabilidades de salvarse y en el caso de los hombres el porcentaje más alto estaba en los niños." />
        </Col>

        <Col xs={12} md={8} lg={8} className="mx-auto">
          <MetricCard
            title="Matriz de Correlación Multivariada"
            chartId="correlationMatrix"
            textExplaination={`
                  <p><strong>Conclusiones de la matriz de correlación:</strong></p>

                  <p><strong>Supervivencia:</strong><br/>
                  El sexo masculino se codificó como 0 y el femenino como 1, es por esto que en la matriz se ve que la supervivencia se correlaciona con el sexo. Las mujeres tenían más probabilidades que los hombres.<br/>
                  Al tomar las clases como 1, 2 y 3, la clase alta tiene un número bajo y la clase baja un número alto. Esto da como resultado que la correlación sea negativa, una clase 3 tiene menos probabilidades de sobrevivir que una clase 1.<br/>
                  Hay una leve correlación positiva respecto a la tarifa pagada y la probabilidad de sobrevivir, esto confirma la correlación vista en la clase en la que viajaba el pasajero.<br/>
                  Para el resto de variables la correlación es prácticamente nula.
                  </p>

                  <p><strong>Clase:</strong><br/>
                  Por lo explicado anteriormente puede ser una obvia correlación negativa entre clase y tarifa, un pasajero de clase 1 pagó más que uno de clase 3.<br/>
                  Con relación a la edad también hay correlación negativa, una clase 1 tiene más edad que una clase 3.<br/>
                  Por estár codificado el sexo masculino se como 0 y el femenino como 1 se puede ver que se da una leve correlación negativa, a mayor valor en la clase más probable que sea hombre.
                  </p>

                  <p><strong>Sexo:</strong><br/>
                  Las mujeres era más probable que viajen con familiares que los hombres.
                  </p>

                  <p><strong>Edad:</strong><br/>
                  A mayor edad es menos probable que viajen con hermanos o esposos y levemente menos probable que viajen con padres o hijos.
                  </p>

                  <p><strong>Hermanos/esposos:</strong><br/>
                  Si viajaban con hermanos o esposos era más probable que viajaran con padres o hijos.<br/>
                  Hay una leve correlación positiva con la tarifa.
                  </p>

                  <p><strong>Padres/hijos:</strong><br/>
                  Al igual que en el caso anterior, se puede ver que si viajaban con padres o hijos era más probable que hayan pagado una tarifa más alta.
                  </p>
                  `}
          />
        </Col>
      </Row>
    </Container>
  );
}
