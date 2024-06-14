import { Container } from "react-bootstrap";
import Navbar from "../components/Navbar";
import PropertyList from "../components/PropertyList";
import AddProperty from "./AddProperty";

function Home() {
  return (
    <>
      <Container>
        <PropertyList />
        <AddProperty />
      </Container>
    </>
  );
}

export default Home;
