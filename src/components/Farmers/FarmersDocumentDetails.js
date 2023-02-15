import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';

export const FarmersDocumentDetails = () => {
  return (
    <>
      <Form className="details-form">
        <Row>
          <Col className="me-3 ms-3">
            <Row className="mb-3">
              <Form.Label>Card No</Form.Label>
              <Form.Select id="txtCardNo" name="cardNo">
                <option value="select">Select</option>
              </Form.Select>
            </Row>
            <Row className="mb-3">
              <Form.Label>Registration Fee</Form.Label>
              <Form.Select id="txtRegistrationFee" name="registrationFee">
                <option value="select">Select</option>
              </Form.Select>
            </Row>
            <Row className="mb-3">
              <Form.Label>Share Form</Form.Label>
              <Form.Select id="txtShareForm" name="shareForm">
                <option value="select">Select</option>
              </Form.Select>
            </Row>
            <Row className="mb-3">
              <Form.Label>Share To</Form.Label>
              <Form.Select id="txtShareTo" name="shareTo">
                <option value="select">Select</option>
              </Form.Select>
            </Row>
            <Row className="mb-3">
              <Form.Label>Total Share</Form.Label>
              <Form.Select id="txtTotalShare" name="totalShare">
                <option value="select">Select</option>
              </Form.Select>
            </Row>
          </Col>

          <Col className="me-3 ms-3">
            <Row className="mb-3">
              <Form.Label>Farmer's Photo</Form.Label>
              <Form.Control
                type="File"
                id="fileImageUpload"
                name="imageUplod"
                placeholder="Choose File"
              />
            </Row>
            <Row className="mb-3">
              <Form.Label>Original Farmer From</Form.Label>
              <Form.Control
                type="File"
                id="fileOriginalFarmerFrom"
                name="OriginalFarmerFrom"
                placeholder="Choose File"
                disabled
              />
            </Row>
            <Row className="mb-3">
              <Form.Label>Id Proof Type</Form.Label>
              <Form.Select id="txtIdProofType" name="idProofType">
                <option value="select">Select</option>
              </Form.Select>
            </Row>
            <Row className="mb-3">
              <Form.Label>ID Card</Form.Label>
              <Form.Control
                type="File"
                id="fileIdCard"
                name="idCard"
                placeholder="Choose File"
                disabled
              />
            </Row>
            <Col >
              <Form.Group as={Row} className="mb-2">
                <Form.Label column sm={4}>
                  Aadhaar No
                </Form.Label>
                <Col sm={8}>
                <Form.Control
                type="Number"
                min={0} 
                id="numAadhaarNo"
                name="aadhaarNo"
                placeholder="Aadhaar No"
               />
                </Col>
              </Form.Group>
            </Col>

            <Row className="mb-3">
              <Form.Label>Aadhaar Front Img</Form.Label>
              <Form.Control
                type="File"
                id="fileAadhaarFrontImg"
                name="aadhaarFrontImg"
                placeholder="Choose File"
              />
            </Row>
            <Row className="mb-3">
              <Form.Label>Aadhaar Back Img</Form.Label>
              <Form.Control
                type="File"
                id="fileAadhaarBackImg"
                name="AadhaarBackImg"
                placeholder="Choose File"
              />
            </Row>
          </Col>
          
          <Col  className="me-3 ms-3">
          <Row className="mb-3 my-4">
              <Form.Control
                type="text"
                id="txtUpload1"
                name="Uplod1"
                placeholder=""
              />
            </Row>
            <Row className="mb-3 my-5 "></Row>
            <Row className="mb-3 my-1 "></Row>
            <Row className="mb-3 my-5">
              <Form.Control
                type="text"
                id="txtIdProofNo"
                name="idProofNo"
                placeholder="ID Proof No"
              />
            </Row>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default FarmersDocumentDetails;
