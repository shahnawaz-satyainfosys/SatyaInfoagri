import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

export const FarmersLiveStockDetails = () => {
  const [formHasError, setFormError] = useState(false);

  useEffect(() => {
    $('#FarmersLiveStockDetailsForm').hide();
  }, []);

  const hideForm = () => {
    $('#FarmersLiveStockDetailsForm').hide();
    $('#FarmersLiveStockDetailsListCard').show();
  };
  return (
    <>
      <Form
        noValidate
        validated={formHasError}
        className="details-form"
        id="AddFarmersLiveStockDetailsForm"
      >
        <Row>
          <Col className="me-3 ms-3">
            <Row className="mb-3">
              <Form.Label className="details-form">Cattle Type</Form.Label>
              <Form.Select id="txtCattleType" name="cattleType">
                <option value="">Select</option>
                <option value="cType">cType</option>
                <option value="current">Current</option>
              </Form.Select>
            </Row>
          </Col>
          <Col className="me-3 ms-3">
            <Row className="mb-3">
              <Form.Label>No Of Cattle</Form.Label>
              <Form.Control
                type="text"
                id="txtNoOfCattle"
                name="noOfCattle"
                placeholder="No Of Cattle"
              />
            </Row>
          </Col>
          <Col className="me-3 ms-3">
            <Row className="mb-3">
              <Form.Label>Production</Form.Label>
              <Form.Control
                type="text"
                id="txtProduction"
                name="proDuction"
                placeholder="Prodcution"
              />
            </Row>
          </Col>
          <Col className="me-3 ms-3">
            <Row className="mb-3">
              <Form.Label className="details-form">Rate Per Litter</Form.Label>
              <Form.Control
                id="txtRatePerLitter"
                name="ratePerLitter"
                placeholder="Rate Per Litter"
              />
            </Row>
          </Col>
        </Row>

        <Row>
          <Col className="me-3 ms-3">
            <Row className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control id="txtAge" name="age" min={0} placeholder="Age" />
            </Row>
          </Col>

          <Col className="me-3 ms-3">
            <Row className="mb-3">
              <Form.Label>Milk Type</Form.Label>
              <Form.Select id="txtUsages" name="usaGes">
                <option value="">Select</option>
                <option value="select1">select1</option>
                <option value="current">Current</option>
              </Form.Select>
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
          </Col>
          <Col className="me-3 ms-3">
            <Row className="mb-2" id="btnFarmersLiveStockDetail">
              <Button variant="primary" type="button">
                Add
              </Button>
            </Row>
            {/* <Row className="mb-2" id='btnUpdateFarmersLiveStockDetail'>
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
  );
};

export default FarmersLiveStockDetails;
