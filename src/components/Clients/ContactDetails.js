import React from 'react';
import { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const ContactDetails = () => {

  const [formData, setFormData] = useState({
    contactPersonName: '',
    mobileNo: '',
    emailId: '',
    sendMail: '',
    activeStatus: ''
  });

  const handleSubmit = e => {
    e.preventDefault();

    const form = e.currentTarget;
    const userData = {
      EncryptedClientCode: localStorage.getItem("EncryptedResponseClientCode"),
      contactPerson: formData.contactPersonName,
      mobileNo: formData.mobileNo,
      emailId: formData.emailId,
      sendMail: formData.sendMail,
      activeStatus: formData.activeStatus,
      AddUser: localStorage.getItem("LoginUserName")
    }
    console.log(userData);
    axios.post(process.env.REACT_APP_API_URL + '/add-client-contact-details', userData)
      .then(res => {
        debugger   
        if (res.data.status == 200) {
          toast.success(res.data.message, {
            theme: 'colored'
          });
        } else {
          toast.error(res.data.message, {
            theme: 'colored'
          });
        }
      })
  };

  const handleFieldChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Form className="contact-details-form" onSubmit={e => { handleSubmit(e) }}>
        <Row>
          <Col className="me-5 ms-5">
            <Row className="mb-3">
              <Form.Label>Contact Person*</Form.Label>
              <Form.Control id="txtContactPerson" name="contactPersonName" maxLength={50} onChange={handleFieldChange} placeholder="Contact person name" required />            
            </Row>

            <Row className="mb-3">
              <Form.Label>Mobile No</Form.Label>
              <Form.Control id="txtMobileno" name="mobileNo" maxLength={10} onChange={handleFieldChange} placeholder="Mobile No" required />
            </Row>

            <Row className="mb-3">
              <Form.Label>Email Id</Form.Label>
              <Form.Control id="txtEmailId" name="emailId" maxLength={50} onChange={handleFieldChange} placeholder="Email Id" />
            </Row>
          </Col>
          <Col>
            <Row className="mb-3">
              <Form.Label>Send Mail</Form.Label>
              <Form.Select id="txtSendMail" name="sendMail" onChange={handleFieldChange}>
                <option value=''>Select</option>
                <option value="Y">Yes</option>
                <option value="N">No</option>
              </Form.Select>
            </Row>

            <Row className="mb-3">
              <Form.Label>Active Status</Form.Label>
              <Form.Select id="txtActiveStatus" name="activeStatus" onChange={handleFieldChange}>
                <option value=''>Select</option>
                <option value="A">Active</option>
                <option value="S">Suspended</option>
              </Form.Select>
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
  )
};


export default ContactDetails;