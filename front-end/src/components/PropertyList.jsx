import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PropertyCard from './PropertyCard';
import { BASE_URL } from '../utilis';

function PropertyList({ searchTerm}) {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${BASE_URL}/property_list`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }
        return res.json();
      })
      .then((data) => {
        setProperties(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log('PropertyList searchTerm:', searchTerm)
  console.log('Properties:', properties)

  const filteredProperties = properties.filter(property =>
    (property.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (property.location?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Row className="mt-3">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <Col key={property.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <PropertyCard 
                name={property.name}
                location={property.location}
                rent={property.rent}
                image={property.image}
                description={property.description}
                type={property.housing_unit_type.name}
              />
            </Col>
          ))
        ) : (
          <Col>
            <p>No properties found.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default PropertyList;