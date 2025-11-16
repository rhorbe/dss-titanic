import { Form, Row, Col, Button } from "react-bootstrap";

export default function PassengerForm() {
  return (
    <div className="d-flex justify-content-center w-100">
      <Form style={{ width: "100%", maxWidth: "550px" }}>
        <h5 className="text-center mb-4">Ingrese los datos del pasajero:</h5>

        {/* Clase */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={4}>Clase</Form.Label>
          <Col sm={8}>
            <Form.Select>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </Form.Select>
          </Col>
        </Form.Group>

        {/* Sexo */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={4}>Sexo</Form.Label>
          <Col sm={8}>
            <Form.Select>
              <option>male</option>
              <option>female</option>
            </Form.Select>
          </Col>
        </Form.Group>

        {/* Edad */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={4}>Edad</Form.Label>
          <Col sm={8}>
            <Form.Control type="number" />
          </Col>
        </Form.Group>

        {/* Hermanos / Pareja */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={4}>Hermanos / Pareja</Form.Label>
          <Col sm={8}>
            <Form.Control type="number" />
          </Col>
        </Form.Group>

        {/* Padres / Hijos */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={4}>Padres / Hijos</Form.Label>
          <Col sm={8}>
            <Form.Control type="number" />
          </Col>
        </Form.Group>

        {/* Tarifa */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={4}>Tarifa</Form.Label>
          <Col sm={8}>
            <Form.Control type="number" />
          </Col>
        </Form.Group>

        {/* Botón */}
        <div className="d-flex justify-content-center mt-4">
          <Button variant="secondary" type="submit" className="px-5">
            Predecir Supervivencia
          </Button>
        </div>
      </Form>
    </div>
  );
}
