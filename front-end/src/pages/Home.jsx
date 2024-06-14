import { Container } from "react-bootstrap";
import PropertyList from "../components/PropertyList";

function Home() {
  return (
    <>
      <Container fluid>
        <PropertyList />
      </Container>
    </>
  );
}

export default Home;
