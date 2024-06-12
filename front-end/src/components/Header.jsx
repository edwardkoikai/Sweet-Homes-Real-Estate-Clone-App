import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

function Header() {
  return (
    <Container fluid className="bg-light py-3">
      <Row>
        <Col xs="auto" className="ms-3">
          <header>
            <p className="h1 mb-0">Home-Sweet-Home</p>
            <Image src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg" alt="logo" fluid />
          </header>
        </Col>
      </Row>
    </Container>
  );
}

export default Header;