import { useState } from "react";
import { Form, Row, Col, Button, Alert, Spinner } from "react-bootstrap";
import ProbabilityGauge from "./ProbabilityGauge";

export default function PassengerForm() {
  const [formData, setFormData] = useState({
    pClass: "",
    sex: "male",
    age: "",
    sibSp: "",
    parch: "",
    fare: "",
    embarked: "S"
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);  // estado para la predicción
  const [error, setError] = useState(null);
  const [validated, setValidated] = useState(false);
  const [resultImage, setResultImage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getRandomImage = (type, max) => {
    const randomNum = Math.floor(Math.random() * max) + 1;

    // Posibles extensiones
    const extensions = ["png", "jpg", "jpeg", "gif", "webp"];

    // Crear rutas posibles
    const candidates = extensions.map(ext => `/img/${type}_${randomNum}.${ext}`);
    console.log("Candidatos de imagen:", candidates);
    return new Promise(resolve => {
      let index = 0;

      const tryNext = () => {
        if (index >= candidates.length) {
          resolve(null); // No se encontró
          return;
        }

        const img = new Image();
        img.src = candidates[index];

        img.onload = () => resolve(candidates[index]); // Existe
        img.onerror = () => {
          index++;
          tryNext(); // Probar siguiente extensión
        };
      };

      tryNext();
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidated(true);

    const form = e.target;
    const fd = new FormData(form);

    // Validación de HTML5
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    const payload = {
      pClass: Number(fd.get("pClass")),
      sex: fd.get("sex"),
      age: Number(fd.get("age")),
      sibSp: Number(fd.get("sibSp")),
      parch: Number(fd.get("parch")),
      fare: Number(fd.get("fare")),
      embarked: fd.get("embarked")
    };
    console.log("Payload enviado:", payload);
    try {
      const res = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setResult(data);

      // 🔥 Obtener imagen aleatoria según supervivencia
      if (data.survived === 1 || data.survived === true) {
        const src = await getRandomImage("sobrevivio_si", 3);
        setResultImage(src);
      } else {
        const src = await getRandomImage("sobrevivio_no", 3);
        setResultImage(src);
      }
    } catch (err) {
      setError("Error conectando con la API");
    }

    setLoading(false);
  };

  return (
    <div className="d-flex justify-content-center w-100">
      <Form style={{ width: "100%", maxWidth: "550px" }} onSubmit={handleSubmit}>
        <h5 className="text-center mb-4">Ingrese los datos del pasajero:</h5>

        {/* Mensajes */}
        {error && <Alert variant="danger">{error}</Alert>}

        {/* Clase */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={4}>Clase</Form.Label>
          <Col sm={8}>
            <Form.Select
              name="pClass"
              required
              onChange={handleChange}
              isInvalid={validated && !formData.pClass}
            >
              <option value="">Seleccione...</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Debe seleccionar una clase.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>


        {/* Sexo */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={4}>Sexo</Form.Label>
          <Col sm={8}>
            <Form.Select
              name="sex"
              required
              onChange={handleChange}
              isInvalid={validated && !formData.sex}
            >
              <option value="male">Hombre</option>
              <option value="female">Mujer</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Debe seleccionar un sexo.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        {/* Edad */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={4}>Edad</Form.Label>
          <Col sm={8}>
            <Form.Control
              name="age"
              type="number"
              required
              min="1"
              onChange={handleChange}
              isInvalid={validated && (!formData.age || formData.age <= 0)}
            />
            <Form.Control.Feedback type="invalid">
              Ingrese una edad válida.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>


        {/* Hermanos/Pareja */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={4}>Hermanos / Pareja</Form.Label>
          <Col sm={8}>
            <Form.Control
              name="sibSp"
              type="number"
              required
              min="0"
              onChange={handleChange}
              isInvalid={validated && formData.sibSp === ""}
            />
            <Form.Control.Feedback type="invalid">
              Indique un número válido.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>


        {/* Padres/Hijos */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={4}>Padres / Hijos</Form.Label>
          <Col sm={8}>
            <Form.Control
              name="parch"
              type="number"
              required
              min="0"
              onChange={handleChange}
              isInvalid={validated && formData.parch === ""}
            />
            <Form.Control.Feedback type="invalid">
              Indique un número válido.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        {/* Tarifa */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={4}>Tarifa</Form.Label>
          <Col sm={8}>
            <Form.Control
              name="fare"
              type="number"
              required
              min="1"
              onChange={handleChange}
              isInvalid={validated && (!formData.fare || formData.fare <= 0)}
            />
            <Form.Control.Feedback type="invalid">
              La tarifa debe ser mayor a 0.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>


        {/* Embarked */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={4}>Embarque</Form.Label>
          <Col sm={8}>
            <Form.Select
              name="embarked"
              required
              onChange={handleChange}
              isInvalid={validated && !formData.embarked}
            >
              <option value="S">Southampton</option>
              <option value="C">Cherbourg</option>
              <option value="Q">Queenstown</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Seleccione un puerto de embarque.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        {/* Botón */}
        <div className="d-flex justify-content-center mt-4">
          <Button variant="secondary" type="submit" className="px-5" disabled={loading}>
            {loading ? (
              <Spinner size="sm" animation="border" />
            ) : (
              "Predecir Supervivencia"
            )}
          </Button>
        </div>
      </Form>

      {/* Resultado */}
      {result && !error && (
        <div className="mt-4 w-100 d-flex justify-content-center" style={{ maxWidth: "550px" }}>
          {result.error ? (
            <div
              className="p-3 rounded shadow-sm w-100"
              style={{
                backgroundColor: "#ffe5e5",
                borderLeft: "6px solid #d9534f",
                animation: "fadeIn 0.3s ease"
              }}
            >
              <h5 className="text-danger m-0">{result.error}</h5>
            </div>
          ) : (
            <div
              className="p-4 rounded shadow-sm text-center w-100"
              style={{
                backgroundColor: result.survived ? "#e6ffed" : "#ffe5e5",
                borderLeft: `6px solid ${result.survived ? "#28a745" : "#d9534f"}`,
                animation: "fadeIn 0.3s ease"
              }}
            >
              <h3
                className="fw-bold"
                style={{
                  color: result.survived ? "#1e7e34" : "#b52b27"
                }}
              >
                {result.survived ? "✓ El pasajero sobrevivió" : "✗ El pasajero NO sobrevivió"}
              </h3>

              {/* 🔥 IMAGEN ALEATORIA */}
              {resultImage && (
                <img
                  src={resultImage}
                  alt={result.survived ? "Sobrevivió" : "No sobrevivió"}
                  style={{
                    width: "300px",
                    marginTop: "15px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.15)"
                  }}
                />
              )}
              {/* 🔥 PROBABILIDAD */}
              {result.survived !== undefined && (
              <ProbabilityGauge
                value={result}
                survived={result.survived}
              />
              )}
            

            </div>
          )}
        </div>
      )}
    </div>
  );
}
