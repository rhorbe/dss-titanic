import { Container } from "react-bootstrap";

export default function About() {
    return (
        <Container>
            <h1 className="mb-4">Acerca de esta Aplicación</h1>
            <p>
                Esta aplicación fue desarrollada como parte del proyecto final para la materia de Sistemas de Soporte Para la Toma De Desiciones (SSD) en la Universidad Nacional de La Patagonia San Juan Bosco. Su objetivo es analizar el dataset del Titanic,
                mostrar métricas relevantes y predecir la supervivencia de los pasajeros utilizando modelos de machine
                learning.
            </p>
            <p> 
                La aplicación utiliza técnicas de preprocesamiento de datos, análisis exploratorio y modelado predictivo
                para lograr sus objetivos. Se basa en el trabajo práctico realizado en la materia y busca ser una herramienta
                útil para comprender mejor los factores que influyen en la supervivencia de los pasajeros del Titanic.
            </p>
        </Container>
    );
}
