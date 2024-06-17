import React from "react";
import PropertyCard from "./PropertyCard";
import { Col, Row } from 'react-bootstrap';
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { BASE_URL } from '../utilis'
// import ViewButton   from './ViewButton';



function PropertyList() {

  const [property_lists, setProperty] = useState([])

  useEffect(() => {
    fetch(`${BASE_URL}/property_list`)
      .then((res) => res.json())
      .then((data) => setProperty(data))
      .catch((err) => console.log(err));

  }, []);


  return (
    <Container>
      <Row className="mt-3">
        {property_lists.map((property_list) => (
          <Col key={property_list.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <PropertyCard {...property_list} />
          </Col>
        ))}
      </Row>
      {/* <ViewButton /> */}
    </Container>

  );
}

export default PropertyList;
