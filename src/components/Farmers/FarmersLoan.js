import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

export const FarmersLoanDetails = () => {

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
            <Form.Label className="details-form">Loan Name</Form.Label>
            <Form.Select id="txtLoanName" name="loanName">
              <option value="">Select</option>
              <option value="Home Loan">Home Loan</option>
              <option value="current">Current</option>
            </Form.Select>
          </Row>
        </Col>
        <Col className="me-3 ms-3">
          <Row className="mb-3">
            <Form.Label>Bank Name</Form.Label>
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
        <Col className="me-3 ms-3">
          <Row className="mb-3">
          <Form.Label>Loan Amount</Form.Label>
            <Form.Control
              type="number"
              id="txtLoanAmount"
              name="loanAmount"
              min={0}
              placeholder="Loan Amount"
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
    
  )
}

export default FarmersLoanDetails