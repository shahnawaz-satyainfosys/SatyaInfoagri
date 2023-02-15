import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';

export const FarmersPremiumDetails = () => {
  return (
    <>
      <Form>
        <Row>
          <Col>
            <Form.Group as={Row} className="mb-2">
              <Form.Label column sm={4}>
                Premium Eligible
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  min={0}
                  id="txtImageUpload"
                  name="imageUplod"
                  placeholder="Premium"
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default FarmersPremiumDetails;
