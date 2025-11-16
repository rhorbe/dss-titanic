import { Container } from "react-bootstrap";

export default function Home() {
  return (
    <Container>
      <header>
        <h1>Análisis del Dataset Titanic</h1>
        <p className="lead">
          Esta aplicación tiene como objetivo mostrar las métricas y predecir la supervivencia de los pasajeros.
        </p>
      </header>
    </Container>
  );
}
