import { Container } from "react-bootstrap";
import Navbar from "../components/Navbar";
import PropertyList from "../components/PropertyList";

function Home() {
  return (
    <>
      <Container>
        <Navbar />
        <PropertyList />
      </Container>
    </>
  );
}

export default Home;
