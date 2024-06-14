import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function PropertyCard() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://images.pexels.com/photos/1571470/pexels-photo-1571470.jpeg?auto=compress&cs=tinysrgb&w=600"/>
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button>view</Button>
        <Button>Reserve</Button>
      </Card.Body>
    </Card>
  );
}

export default PropertyCard;