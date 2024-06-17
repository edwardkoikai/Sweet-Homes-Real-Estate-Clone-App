import { Container } from "react-bootstrap";
import PropertyList from "../components/PropertyList";
import { useOutletContext } from 'react-router-dom';

function Home() {
  const [searchTerm] = useOutletContext();
  console.log('Home searchTerm:', searchTerm);
  return (
    <>
      <Container >
        <PropertyList searchTerm={searchTerm}/>
      </Container>
    </>
  );
}

export default Home;
