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

  const [formHasError, setFormError] = useState(false);
  const [contactNameErr, setContactNameErr] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleValidation = () => {
    const contactNameErr = {};

    let isValid = true;

    if (!formData.contactPersonName) {
      contactNameErr.nameEmpty = "Enter contact person name";
      isValid = false;
      setFormError(true);
    }
    if (!isValid) {
      setContactNameErr(contactNameErr);
    }
    return isValid;
  }

  const handleSubmit = e => {
    e.preventDefault();

    const form = e.currentTarget;

    if (handleValidation()) {
      const userData = {
        EncryptedClientCode: localStorage.getItem("EncryptedResponseClientCode"),
        contactPerson: formData.contactPersonName,
        mobileNo: formData.mobileNo,
        emailId: formData.emailId,
        sendMail: formData.sendMail,
        activeStatus: formData.activeStatus,
        AddUser: localStorage.getItem("LoginUserName")
      }

      setIsLoading(true);

      axios.post(process.env.REACT_APP_API_URL + '/add-client-contact-details', userData)
        .then(res => {
          setIsLoading(false);
          if (res.data.status == 200) {
            toast.success(res.data.message, {
              theme: 'colored'
            });
            $("#ContactDetailsTable").show();
            $("#AddContactDetailsForm").hide();            
          } else {
            toast.error(res.data.message, {
              theme: 'colored'
            });
          }
        })
    }
  };

  const handleFieldChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const hideForm = () => {
    $("#AddContactDetailsForm").hide();
    $("#btnAdd").show();
  }

  return (
    <>
      {isLoading ? (
        <Spinner
          className="position-absolute start-50 loader-color"
          animation="border"
        />
      ) : null}
      <Form noValidate validated={formHasError} className="details-form" onSubmit={e => { handleSubmit(e) }}>
        <Row>
          <Col className="me-5 ms-5">
            <Row className="mb-3">
              <Form.Label className='details-form'>Contact Person<span className="text-danger">*</span></Form.Label>
              <Form.Control id="txtContactPerson" name="contactPersonName" maxLength={50} onChange={handleFieldChange} placeholder="Contact person name" required />
              {Object.keys(contactNameErr).map((key) => {
                return <span className="error-message">{contactNameErr[key]}</span>
              })}
            </Row>
            <Row className="mb-3">
              <Form.Label>Mobile No</Form.Label>
              <Form.Control id="txtMobileno" name="mobileNo" maxLength={10} onChange={handleFieldChange} placeholder="Mobile No" />
            </Row>
          </Col>
          <Col>
          <Row className="mb-3">
              <Form.Label>Email Id</Form.Label>
              <Form.Control id="txtEmailId" name="emailId" maxLength={50} onChange={handleFieldChange} placeholder="Email Id" />
            </Row>
            <Row className="mb-3">
              <Form.Label>Send Mail</Form.Label>
              <Form.Select id="txtSendMail" name="sendMail" onChange={handleFieldChange}>
                <option value=''>Select</option>
                <option value="Y">Yes</option>
                <option value="N">No</option>
              </Form.Select>
            </Row>
            <Row className="mb-3">
              <Button variant="primary" type="submit">
                Add
              </Button>
            </Row>
            <Row className="mb-3">
              <Button variant="danger" onClick={() => hideForm()}>
                Cancel
              </Button>
            </Row>
          </Col>
        </Row>
      </Form>
    </>
  )
};


export default ContactDetails;