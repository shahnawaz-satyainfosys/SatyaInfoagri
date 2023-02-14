import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

export const FarmersMachinaryDetails = () => {
    const [formHasError, setFormError] = useState(false);

    useEffect(() => {
        $('#FarmersMachinaryDetailsForm').hide();
      }, []);

    const hideForm = () => {
      $('#FarmersMachinaryDetailsForm').hide();
      $('#FarmersMachinaryDetailsListCard').show();
    };
  return (
    <>
    <Form
         noValidate
         validated={formHasError}
         className="details-form"
         id="AddFarmersMachinaryDetailsForm"
       >
         <Row>
           <Col className="me-3 ms-3">
             <Row className="mb-3">
             <Form.Label className="details-form">Equipment Category</Form.Label>
               <Form.Select id="txtEquipment" name="equipmentCategory">
                 <option value="">Select</option>
                 <option value="Category">Category</option>
                 <option value="Card">Card</option>
               </Form.Select>
             </Row>
           </Col>
           <Col className="me-3 ms-3">
             <Row className="mb-3">
             <Form.Label>Equipment Type</Form.Label>
               <Form.Control
                 type="text"
                 id="txtEquipmentTYpe"
                 name="equipmentType"
                 placeholder="Equipment Type"
               />
             </Row>
           </Col>
           <Col className="me-3 ms-3">
             <Row className="mb-3">
             <Form.Label>Quantity</Form.Label>
               <Form.Control
                 type="number"
                 id="numQuantity"
                 name="quantity"
                 min={0}
                 placeholder="Quantity"
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
             <Row className="mb-2" id="btnFarmersMachinaryDetails">
               <Button variant="primary" type="button">
                 Add
               </Button>
             </Row>
             {/* <Row className="mb-2" id='btnUpdateFarmersMachinaryDetails'>
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

export default FarmersMachinaryDetails