import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
const FarmersCardDetails = () => {
    const [formHasError, setFormError] = useState(false);

    useEffect(() => {
        $('#FarmersCardDetailsForm').hide();
      }, []);

    const hideForm = () => {
      $('#FarmersCardDetailsForm').hide();
      $('#FarmersCardDetailsListCard').show();
    };

  return (
   <>
   <Form
        noValidate
        validated={formHasError}
        className="details-form"
        id="AddFarmersCardDetailsForm"
      >
        <Row>
          <Col className="me-3 ms-3">
            <Row className="mb-3">
            <Form.Label className="details-form">Card Name</Form.Label>
              <Form.Select id="txtCardName" name="cardName">
                <option value="">Select</option>
                <option value="Kisan Credit Card">Kisan Credit Card</option>
                <option value="Card">Card</option>
              </Form.Select>
            </Row>
          </Col>
          <Col className="me-3 ms-3">
            <Row className="mb-3">
            <Form.Label>Card Number</Form.Label>
              <Form.Control
                type="number"
                id="numCardNumber"
                name="cardNumber"
                min={0}
                placeholder="Card Number"
              />
            </Row>
          </Col>
          <Col className="me-3 ms-3">
            <Row className="mb-3">
              <Form.Label>Active Status</Form.Label>
              <Form.Select id="txtStatus" name="status">
                <option value="Active">Active</option>
                <option value="Suspended">Suspended</option>
              </Form.Select>
            </Row>
            <Row className="mb-2" id="btnFarmersCardDetails">
              <Button variant="primary" type="button">
                Add
              </Button>
            </Row>
            {/* <Row className="mb-2" id='btnUpdateFarmersCardDetails'>
                            <Button variant="primary">
                                Update
                            </Button>
                        </Row> */}
            <Row className="mb-2">
              <Button variant="danger" onClick={() => hideForm()}>
                Cancel
              </Button>
            </Row>
          </Col>
        </Row>
      </Form>
   
   </>
  )
}

export default FarmersCardDetails