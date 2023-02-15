import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

export const FarmersIrrigrationDetails = () => {

    const [formHasError, setFormError] = useState(false);

    useEffect(() => {
        $('#FarmersIrrigrationDetailsForm').hide();
      }, []);

    const hideForm = () => {
      $('#FarmersIrrigrationDetailsForm').hide();
      $('#FarmersIrrigrationDetailsListCard').show();
    };
    
  return (
    <>
   <Form
        noValidate
        validated={formHasError}
        className="details-form"
        id="AddFFarmersIrrigrationDetailsForm"
      >
        <Row>
        <Col className="me-3 ms-3">
            <Row className="mb-3">
            <Form.Label>Irrigration Detail</Form.Label>
            <Form.Select id="txtIrrigration" name="irrigration">
                 <option value="">Select</option>
                 <option value="irrigartions">IRRIGRATION1</option>
                 <option value="Card">Card</option>
               </Form.Select>
            </Row>
          </Col>
          <Col className="me-3 ms-3">
            <Row className="mb-3">
            <Form.Label className="details-form">Souce Of Water</Form.Label>
              <Form.Select id="txtSouceOfWater" name="souceOfWater">
                <option value="">Select</option>
                <option value="Bore Well">BORE WELL</option>
                <option value="bhada">BHADA</option>
                <option value="canal">CANAL</option>
                <option value="electric motor">ELECTRIC MOTOR</option>
                <option value="ground water">GROUND WATER</option>
                <option value="nalkup">NALKUP</option>
                <option value="pump">PUMP</option>
                <option value="pond">POND</option>
                <option value="river">RIVER</option>
                <option value="shallow">SHALLOW</option>
                <option value="tubewell">TUBEWELL</option>
                <option value="well">WELL</option>
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
            <Row className="mb-2" id="btnFarmersIrrigrationsDetails">
              <Button variant="primary" type="button">
                Add
              </Button>
            </Row>
            {/* <Row className="mb-2" id='btnUpdateFarmersIrrigrationsDetails'>
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

export default FarmersIrrigrationDetails