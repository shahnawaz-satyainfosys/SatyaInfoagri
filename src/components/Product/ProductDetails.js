import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap';

export const ProductDetails = () => {

  const [formHasError, setFormError] = useState(false);

  return (
    <>
      <Form noValidate validated={formHasError} className="details-form" id='ProductDetailsForm'>
        <Row>
          <Col className="me-3 ms-3">
            <Row className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control id="txtProductName" name="productName" />
            </Row>
         
            <Row className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select id="txtStatus" name="status" >
                <option value="Active">Active</option>
                <option value="Suspended">Suspended</option>
              </Form.Select>
            </Row>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default ProductDetails;