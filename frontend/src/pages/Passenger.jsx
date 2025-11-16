import { Container } from "react-bootstrap";
import PassengerForm from "../components/PassengerForm";

export default function Passenger() {
    return (
        <Container>
            <div>
                <h1 className="mb-4">Predicción de Supervivencia del Pasajero</h1>
            </div>
            <PassengerForm />
        </Container>
    );
}
