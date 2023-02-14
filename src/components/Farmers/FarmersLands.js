import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

export const FarmersLandsDetails = () => {
    const [formHasError, setFormError] = useState(false);
    const hideForm = () => {
        $('#FarmersLandDetailsForm').hide();
        $('#FarmersLandDetailsListCard').show();
      };
  return (
  
    <>
      <Form
        noValidate
        validated={formHasError}
        className="details-form"
        id="AddFarmersLandDetailsForm"
      >
        <Row>
          <Col className="me-3 ms-3">
            <Row className="mb-3">
              <Form.Label className="details-form">Longitude</Form.Label>
              <Form.Control
                id="txtLongitude"
                name="longitude"
                placeholder="Longitude"
              />
            </Row>
          </Col>
          <Col className="me-3 ms-3">
            <Row className="mb-3">
              <Form.Label>Latitude</Form.Label>
              <Form.Control
                type="text"
                id="txtLatitude"
                name="latitude"
                placeholder="Latitude"
              />
            </Row>
          </Col>
          <Col className="me-3 ms-3">
            <Row className="mb-3">
              <Form.Label>Khashra No</Form.Label>
              <Form.Control
                type="number"
                id="numKhashraNo"
                name="khashraNo"
                min={0}
                placeholder="Khashra No"
              />
            </Row>
          </Col>
        </Row>

        <Row>
          <Col className="me-3 ms-3">
            <Row className="mb-3">
              <Form.Label className="details-form">LandMark</Form.Label>
              <Form.Control
                id="txtLandMark"
                name="landMark"
                placeholder="Land Mark"
              />
            </Row>
          </Col>
        
          <Col className="me-3 ms-3">
            <Row className="mb-3">
              <Form.Label>Ownership</Form.Label>
              <Form.Select id="txtOwnerShip" name="ownerShip">
                <option value="">Select</option>
                <option value="PatnerShip">PatnerShip</option>
                <option value="current">Current</option>
              </Form.Select>
            </Row>
            </Col>
            <Col className="me-3 ms-3">
            <Row className="mb-3">
              <Form.Label>Usages  </Form.Label>
              <Form.Select id="txtUsages" name="usaGes">
                <option value="">Select</option>
                <option value="Usages">Usages</option>
                <option value="current">Current</option>
              </Form.Select>
            </Row>
            </Col>
        </Row>

        <Row>
          <Col className="me-3 ms-3">
            <Row className="mb-3">
              <Form.Label>Org/Inorg</Form.Label>
              <Form.Select id="txtOrgInorg" name="orgInorg">
                <option value="">Select</option>
                <option value="Org">Org</option>
                <option value="Inorg">Current</option>
              </Form.Select>
            </Row>
          </Col>
          <Col className="me-3 ms-3">
            <Row className="mb-3">
              <Form.Label>Cultivated Land</Form.Label>
              <Form.Control
                type="text"
                id="txtCultivatedLand"
                name="cultivatedLand"
                placeholder="Cultivated Land"
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
            <Row className="mb-2" id="btnFarmersLandDetail">
              <Button variant="primary" type="button">
                Add
              </Button>
            </Row>
            {/* <Row className="mb-2" id='btnUpdateFarmersLandDetail'>
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

export default FarmersLandsDetails