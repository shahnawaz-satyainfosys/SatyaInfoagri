import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

export const BankDetails = () => {
  const [formHasError, setFormError] = useState(false);

  const hideForm = () => {
    $('#BankDetailsForm').hide();
    $('#BankDetailsListCard').show();
  };
  return (
    <>
      <Form
        noValidate
        validated={formHasError}
        className="details-form"
        id="AddBankDetailsForm"
      >
        <Row>
          <Col className="me-3 ms-3">
            <Row className="mb-3">
              <Form.Label className="details-form">Bank Name</Form.Label>
              <Form.Control
                id="txtBankName"
                name="bankName"
                placeholder="Bank Name"
              />
            </Row>
          </Col>
          <Col className="me-3 ms-3">
            <Row className="mb-3">
              <Form.Label>Bank Address</Form.Label>
              <Form.Control
                type="text"
                id="txtBankAddress"
                name="bankAddress"
                placeholder="Bank Address"
              />
            </Row>
          </Col>
          <Col className="me-3 ms-3">
            <Row className="mb-3">
              <Form.Label>Account Number</Form.Label>
              <Form.Control
                type="number"
                id="numAccountNumber"
                name="accountNumber"
                min={0}
                placeholder="Account Number"
              />
            </Row>
          </Col>
        </Row>

        <Row>
          <Col className="me-3 ms-3">
            <Row className="mb-3">
              <Form.Label>Account Type</Form.Label>
              <Form.Select id="txtAccountType" name="accountType">
                <option value="">Select</option>
                <option value="saving">Saving</option>
                <option value="current">Current</option>
              </Form.Select>
            </Row>
          </Col>
          <Col className="me-3 ms-3">
            <Row className="mb-3">
              <Form.Label>IFSC Code</Form.Label>
              <Form.Control
                type="text"
                id="txtIFSCCode"
                name="ifscCode"
                placeholder="IFSC Code"
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
            <Row className="mb-2" id="btnBankDetail">
              <Button variant="primary" type="button">
                Add
              </Button>
            </Row>
            {/* <Row className="mb-2" id='btnUpdateBankDetail'>
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

export default BankDetails;
