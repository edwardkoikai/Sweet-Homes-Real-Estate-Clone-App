import React from "react";
import PropertyCard from "./PropertyCard";
import { Col, Row } from 'react-bootstrap';
import {Container} from "react-bootstrap";



function PropertyList() {
  return (
    <Container>
      <Row className="mt-10" style={{ marginTop: 10 }}>
      {new Array(12).fill(Math.random()).map((_, index) => (
        <Col key={index} className="mb-5" xs={6} md={4}>
          <PropertyCard />
        </Col>
      ))}
    </Row>

    </Container>
    
  );
}

export default PropertyList;
