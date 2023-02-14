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
          <Col>
          <Form.Group as={Row} className="mb-2" controlId="formHorizontalEmail">
            <Form.Label column sm={4}>
              Sowing S/Y
            </Form.Label>
            <Row>
              <Col lg={8}>
                <Form.Select id="txtLoanName" name="loanName">
                  <option value="">Select</option>
                  <option value="Home Loan">Home Loan</option>
                  <option value="current">Current</option>
                </Form.Select>
              </Col>
              <Col lg={8}>
              <Form.Select id="txtLoanName" name="loanName">
                  <option value="">Select</option>
                  <option value="Home Loan">Home Loan</option>
                  <option value="current">Current</option>
                </Form.Select>
              </Col>
            </Row>
          </Form.Group>
          </Col>
          <Col>
          <Form.Group as={Row} className="mb-2" controlId="formHorizontalEmail">
            <Form.Label column sm={4}>
              For Month
            </Form.Label>
            <Row>
              <Col sm={4}>
                <Form.Select id="txtLoanName" name="loanName">
                  <option value="">Select</option>
                  <option value="Home Loan">Home Loan</option>
                  <option value="current">Current</option>
                </Form.Select>
              </Col>
              <Col sm={4}>
              <Form.Select id="txtLoanName" name="loanName">
                  <option value="">Select</option>
                  <option value="Home Loan">Home Loan</option>
                  <option value="current">Current</option>
                </Form.Select>
              </Col>
            </Row>
          </Form.Group>
          </Col>
          <Col className="me-3 ms-3">
            <Row className="mb-3">
              <Form.Label className="details-form">Sowing S/Y</Form.Label>
              <Form.Select id="txtLoanName" name="loanName">
                <option value="">Select</option>
                <option value="Home Loan">Home Loan</option>
                <option value="current">Current</option>
              </Form.Select>
            </Row>
            <Row className="mb-3">
              <Form.Label className="details-form">Harvesting Year</Form.Label>
              <Form.Select id="txtLoanName" name="loanName">
                <option value="">Select</option>
                <option value="Home Loan">Home Loan</option>
                <option value="current">Current</option>
              </Form.Select>
            </Row>
          </Col>
          <Col className="me-3 ms-3">
            <Row className="mb-3">
              <Form.Label>Harvesting Year</Form.Label>
              <Form.Select id="txtLoanBankName" name="loanBankName">
                <option value="">Select</option>
                <option value="Mahidra">Mahindra Bank</option>
                <option value="HDFC">HDFC Bank</option>
              </Form.Select>
            </Row>
          </Col>
          <Col className="me-3 ms-3">
            <Row className="mb-3">
              <Form.Select id="txtLoanBankName" name="loanBankName">
                <option value="">Select</option>
                <option value="Mahidra">Mahindra Bank</option>
                <option value="HDFC">HDFC Bank</option>
              </Form.Select>
            </Row>
          </Col>

          <Col className="me-3 ms-3">
            <Row className="mb-3">
              <Form.Label>Branch Name</Form.Label>
              <Form.Control
                type="text"
                id="txtBrachName"
                name="loanBankName"
                placeholder="Branch Name"
              />
            </Row>
          </Col>
          <Form.Group as={Row} className="mb-2" controlId="formHorizontalEmail">
            <Form.Label column sm={4}>
              Total Land
            </Form.Label>
            <Row>
              <Col sm={4}>
                <Form.Control
                  id="txtTotalLand"
                  name="totalLand"
                  className="mb-1"
                  placeholder="Total Land"
                />
              </Col>
              <Col sm={4}>
                <Form.Control
                  id="txtHectare"
                  name=""
                  className="mb-1"
                  placeholder="Hectare"
                />
              </Col>
            </Row>
          </Form.Group>

          <Col className="me-3 ms-3">
            <Row className="mb-3">
              <Form.Label>Active Status</Form.Label>
              <Form.Select id="txtStatus" name="status">
                <option value="Active">Active</option>
                <option value="Suspended">Suspended</option>
              </Form.Select>
            </Row>
            <Row className="mb-2" id="btnFarmersLoanDetail">
              <Button variant="primary" type="button">
                Add
              </Button>
            </Row>
            {/* <Row className="mb-2" id='btnUpdateFarmersLoanDetail'>
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

export default FarmersCropsDetails;
