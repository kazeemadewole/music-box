import React from 'react';
import { Row, Col } from 'react-bootstrap';

const Heading = () => {
  return (
    <Row>
      <Col md={3}>Title</Col>
      <Col md={3}>Artist</Col>
      <Col md={3}>Album</Col>
      <Col md={3} style={{ float: 'left' }}>
        Time
      </Col>
    </Row>
  );
};

export default Heading;
