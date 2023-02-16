import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';

export const FarmersPremiumDetails = () => {
  return (
    <>
      <Form>
        <Row>
          <Col sm={3}>
            
            <Form.Label className="me-2">Premium Eligible</Form.Label>
            <Form.Check
              inline
              className="me-2"
              type="radio"
              id="defaultRadio"
              label="Yes"
              name="radio"
            />

            <Form.Check
              inline
              type="radio"
              id="defaultRadio"
              label="No"
              name="radio"
            />
          </Col>
          <Col sm={4}>
          <Form.Control
              type="text"
              id="txtPremiumEligible"
              name="premiumEligible"
              placeholder="Premium Eligible"
            />
          
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default FarmersPremiumDetails;
