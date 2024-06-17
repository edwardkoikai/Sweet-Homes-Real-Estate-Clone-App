import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function PropertyCard(props) {

  const { name, location, rent, image, description } = props
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Card style={{ width: '14rem' }} className="h-100">
      <Card.Img variant="top" src={image} style={{ height: '200px', objectFit: 'cover' }} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>📍
          {/* <FontAwesomeIcon icon={faLocationDot} /> */}
          {location}
        </Card.Text>
        <Card.Text>Ksh.
          {rent}
        </Card.Text>
        <Button variant="primary" onClick={handleShow} className="me-4">
          View
        </Button>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {description}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Button>Reserve</Button>
      </Card.Body>
    </Card>
  );
}

export default PropertyCard;