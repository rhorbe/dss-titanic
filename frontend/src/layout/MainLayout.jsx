import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function MainLayout({ children }) {
  return (
    <>
      <header className="bg-dark text-white py-4 shadow-sm">
        <Container className="d-flex flex-column align-items-center">

          {/* TITULO PRINCIPAL */}
          <h1 className="mb-3 text-center fw-bold">
            DSS – Trabajo Práctico Final
          </h1>

          {/* BOTONES DE NAVEGACIÓN */}
          <Nav variant="pills" className="justify-content-center gap-3">
            <Nav.Link as={Link} to="/" className="text-white">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/passenger" className="text-white">Ingresar pasajero</Nav.Link>
            <Nav.Link as={Link} to="/metrics" className="text-white">Métricas</Nav.Link>
            <Nav.Link as={Link} to="/models" className="text-white">Modelos ML</Nav.Link>
            <Nav.Link as={Link} to="/about" className="text-white">Sobre el proyecto</Nav.Link>
          </Nav>

        </Container>
      </header>

      {/* CONTENIDO */}
      <Container
        fluid
        className="d-flex flex-column align-items-center justify-content-center mt-4"
        style={{ minHeight: "60vh", textAlign: "center" }}
      >
        {children}
      </Container>
    </>
  );
}
