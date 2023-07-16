import { Col, Container, Row } from "react-bootstrap";
import Lottie from "react-lottie";
import animation from "./animationLottie.json";


export default function Header({name}) {

    const lottieOptions = {
        loop: true, // Se l'animazione deve riprodursi in loop o meno
        autoplay: true, // Se l'animazione deve partire automaticamente quando il componente si monta
        animationData: animation, // L'oggetto JSON dell'animazione
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice" // Modalità di ridimensionamento dell'animazione
        }
    };

    return (
        <Container className="mt-5 mb-5">
            <Row>
            <Col className="p-0">
                    <Lottie options={lottieOptions} width={500} />
                </Col>
                <Col className="d-flex flex-column align-items-center justify-content-center blog-main-title mb-3">
                    <h1>Walcome on Strive Blog {name}!</h1>
                    <p className="fs-3 m-4"><span className="text-success">Explore our blog </span>A World of Discoveries and Inspiration!</p>
                </Col>
            </Row>
        </Container>
    )

}