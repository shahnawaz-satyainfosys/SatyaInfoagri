import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

export const FarmersCropsDetails = () => {
  useEffect(() => {
    $('#FarmersLoanDetailsForm').hide();
  }, []);

  const [formHasError, setFormError] = useState(false);
  const hideForm = () => {
    $('#FarmersLoanDetailsForm').hide();
    $('#FarmersLoanDetailsListCard').show();
  };
  return (
    <>
      <Form
        noValidate
        validated={formHasError}
        className="details-form"
        id="AddFarmersLoanDetailsForm"
      >
        <Row>
          <Col className="me-3 ms-3">
            <Row className="mb-3">
              <Form.Label>Sowing S/Y</Form.Label>
              <Form.Select id="txtSowing" name="sowing">
                <option value="Select">Select</option>
              </Form.Select>
            </Row>
            <Row className="mb-3">
              <Form.Label>Harvesting Year</Form.Label>
              <Form.Select id="txtHarvestingYear" name="harvestingYear">
                <option value="select">Select</option>
              </Form.Select>
            </Row>
            <Row className="mb-3">
              <Form.Label>Market Location</Form.Label>
              <Form.Control
                id="txtMarketLocation"
                name="marketLocation"
                placeholder="Market Location"
              />
            </Row>
          </Col>
          <Col className="me-3 ms-3 my-4">
            <Row className="mb-3">
              <Form.Select id="txtForMonth" name="forMonth">
                <option value="select">Select</option>
              </Form.Select>{' '}
            </Row>
          </Col>
          <Col className="me-3 ms-3">
            <Row className="mb-3">
              <Form.Label>For Month</Form.Label>
              <Form.Select id="txtForMonth" name="forMonth">
                <option value="select">Select</option>
              </Form.Select>
            </Row>
            <Row className="mb-3">
              <Form.Label>H Month</Form.Label>
              <Form.Select id="txtHMonth" name="hMonth">
                <option value="select">Select</option>
              </Form.Select>
            </Row>

            <Row className="mb-3">
              <Form.Label>Market Des.</Form.Label>
              <Form.Control
                type="text"
                id="txtMarketDes"
                name="MarketDes"
                placeholder="Market Des"
              />
            </Row>
          </Col>
          <Col className="me-3 ms-3 my-4">
            <Row className="mb-3">
              <Form.Select id="txtForMonth1" name="forMonth">
                <option value="Select">Select</option>                
              </Form.Select>
            </Row>
            <Row className="mb-3 my-5">
              <Form.Select id="txtHMonth1" name="hMonth1">
                <option value="Active">Select</option>
              </Form.Select>
            </Row>
          </Col>
          <Col className="me-3 ms-3">
            <Row className="mb-3">
              <Form.Label>Area Of Land</Form.Label>
              <Form.Control
                type="text"
                id="txtAreaOfLand"
                name="areOfLand"
                placeholder="Area Of Land"
              />
            </Row>
            <Row className="mb-3">
              <Form.Label>Veriety Name</Form.Label>
              <Form.Select id="txtVarietyName" name="varietyName">
                <option value="select">Select</option>
              </Form.Select>
            </Row>
          </Col>
          <Col className="me-3 ms-3 my-4">
            <Row className="mb-3">
              <Form.Control
                type="text"
                id="txtHectare"
                name="hectare"
                placeholder="Hectare"
                disabled
              />
            </Row>
            <Row className="mb-3 my-5">
              <Form.Control
                type="text"
                id="txtVerietyName1"
                name="varietyName1"
                placeholder="Variety Name"
                disabled
              />
            </Row>
          </Col>

          <Col className="me-3 ms-3">
            <Row className="mb-3">
              <Form.Label>Approval Status</Form.Label>
              <Form.Select id="txtApprovalStatus" name="approvalStatus">
                <option value="select">Select</option>
              </Form.Select>
            </Row>
            <Row className="mb-3">
              <Form.Label>Total Production</Form.Label>
              <Form.Control
                type="text"
                id="txtTotalProduction"
                name="totalProduction"
                placeholder="Total Production"
              />
            </Row>
            <Row className="mb-3">
              <Button variant="primary" type="submit">
                Add
              </Button>
            </Row>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default FarmersCropsDetails;
