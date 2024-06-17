import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function PropertyCard(props) {

  const { name, location, rent, image, description } = props
  return (
    <Card style={{ width: '14rem' }} className="h-100">
      <Card.Img variant="top" src={image} style={{ height: '200px', objectFit: 'cover' }} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
        {/* <FontAwesomeIcon icon={faLocationDot} /> */}
          {location}
        </Card.Text>
        <Card.Text>
          {rent}
        </Card.Text>
        <Button className="me-4">View</Button>
        <Button>Reserve</Button>
      </Card.Body>
    </Card>
  );
}

export default PropertyCard;