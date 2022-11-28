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
    designation: '',
    sendMail: ''
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
        designation: formData.designation,
        sendMail: formData.sendMail,
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

  const updateContactDetails = () => {
    const contactDetail = {
      EncryptedClientContactDetailsId: localStorage.getItem("EncryptedContactId"),
      ContactPersonName: formData.contactPersonName,
      MobileNo: formData.mobileNo,
      EmailId: formData.emailId,
      Designation: formData.designation,
      SendMail: formData.sendMail,
      ModifyUser: localStorage.getItem("LoginUserName")
    }

    setIsLoading(true);

    axios.post(process.env.REACT_APP_API_URL + '/update-client-contact-detail', contactDetail)
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
      <Form noValidate validated={formHasError} className="details-form" onSubmit={e => { handleSubmit(e)}} id='AddContactDetailsForm'>
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
            <Row className="mb-3">
              <Form.Label>Email Id</Form.Label>
              <Form.Control id="txtEmailId" name="emailId" maxLength={50} onChange={handleFieldChange} placeholder="Email Id" />
            </Row>
          </Col>
          <Col>
            <Row className="mb-3">
              <Form.Label>Designation</Form.Label>
              <Form.Control id="txtDesignation" name="designation" maxLength={50} onChange={handleFieldChange} placeholder="Designation" />
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
              <Button variant="primary" id='addContactDetail' type="submit">
                Add
              </Button>
            </Row>
            <Row className="mb-3">
              <Button variant="primary" id='updateContactDetail' style={{ display: 'none' }} onClick={() => updateContactDetails()}>
                Update
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