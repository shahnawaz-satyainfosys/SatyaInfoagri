import React from 'react';
import { useState } from 'react';
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { updateClientContactDetailsAction } from '../../actions/index';
import { clientContactDetailsAction } from '../../actions/index'

const ContactDetails = () => {

  const dispatch = useDispatch();

  const updateClientContactDetailReducer = useSelector((state) => state.rootReducer.updateClientContactDetailReducer)
  var contactDetailData = updateClientContactDetailReducer.updateClientContactDetails;

  if (!updateClientContactDetailReducer.updateClientContactDetails ||
       updateClientContactDetailReducer.updateClientContactDetails.length <= 0) {
    contactDetailData = {
      contactPerson: '',
      mobileNo: '',
      emailId: '',
      designation: '',
      sendMail: ''
    }
  }

  const [formHasError, setFormError] = useState(false);
  const [contactNameErr, setContactNameErr] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleValidation = () => {
    const contactNameErr = {};

    let isValid = true;

    if (!contactDetailData.contactPerson) {
      contactNameErr.nameEmpty = "Enter contact person name";
      isValid = false;
      setFormError(true);
    }
    if (!isValid) {
      setContactNameErr(contactNameErr);
    }
    return isValid;
  }

  const handleSubmit = () => {
    if (handleValidation()) {

      const userData = {
        EncryptedClientCode: localStorage.getItem("EncryptedResponseClientCode"),
        contactPerson: contactDetailData.contactPerson,
        mobileNo: contactDetailData.mobileNo,
        emailId: contactDetailData.emailId,
        designation: contactDetailData.designation,
        sendMail: contactDetailData.sendMail,
        AddUser: localStorage.getItem("LoginUserName")
      }
      // var contactDetailArray = [];
      // contactDetailArray.push(userData);
      // setIsLoading(true);
      dispatch(clientContactDetailsAction(userData));
      $("#AddContactDetailsForm").hide();
      $("#ContactDetailsTable").show();
      $("#btnAdd").show();
    } 
  };

  const updateContactDetails = () => {

    if (handleValidation()) {
      const contactDetail = {
        EncryptedClientContactDetailsId: contactDetailData.encryptedClientContactDetailsId,
        ContactPersonName: contactDetailData.contactPerson,
        MobileNo: contactDetailData.mobileNo,
        EmailId: contactDetailData.emailId,
        Designation: contactDetailData.designation,
        SendMail: contactDetailData.sendMail == "Y" ? "Y" : "N",
        ModifyUser: localStorage.getItem("LoginUserName")
      }

      //To-do: Update this specific record in Reducer and not directly in DB

      // setIsLoading(true);

      // axios.post(process.env.REACT_APP_API_URL + '/update-client-contact-detail', contactDetail)
      //   .then(res => {
      //     setIsLoading(false);
      //     if (res.data.status == 200) {
      //       toast.success(res.data.message, {
      //         theme: 'colored'
      //       });
      //       $("#ContactDetailsTable").show();
      //       $("#AddContactDetailsForm").hide();

      //     } else {
      //       toast.error(res.data.message, {
      //         theme: 'colored'
      //       });
      //     }
      //   })
    }
  };

  const handleFieldChange = e => {
    dispatch(updateClientContactDetailsAction({
      ...contactDetailData,
      [e.target.name]: e.target.value
    }));
  };

  const hideForm = () => {
    $("#AddContactDetailsForm").hide();
    $("#ContactDetailsTable").show();
    $("#btnAdd").show();
    dispatch(updateClientContactDetailsAction(undefined));
  }

  return (
    <>
      {isLoading ? (
        <Spinner
          className="position-absolute start-50 loader-color"
          animation="border"
        />
      ) : null}
      {contactDetailData &&
        <Form noValidate validated={formHasError} className="details-form" onSubmit={() => { handleSubmit() }} id='AddContactForm'>
          <Row>
            <Col className="me-5 ms-5">
              <Row className="mb-3">
                <Form.Label className='details-form'>Contact Person<span className="text-danger">*</span></Form.Label>
                <Form.Control id="txtContactPerson" name="contactPerson" maxLength={50} defaultValue={contactDetailData.contactPerson} onChange={handleFieldChange} placeholder="Contact person name" required />
                {Object.keys(contactNameErr).map((key) => {
                  return <span className="error-message">{contactNameErr[key]}</span>
                })}
              </Row>
              <Row className="mb-3">
                <Form.Label>Mobile No</Form.Label>
                <Form.Control id="txtMobileno" name="mobileNo" maxLength={10} defaultValue={contactDetailData.mobileNo} onChange={handleFieldChange} placeholder="Mobile No" />
              </Row>
              <Row className="mb-3">
                <Form.Label>Email Id</Form.Label>
                <Form.Control id="txtEmailId" name="emailId" maxLength={50} defaultValue={contactDetailData.emailId} onChange={handleFieldChange} placeholder="Email Id" />
              </Row>
            </Col>
            <Col>
              <Row className="mb-3">
                <Form.Label>Designation</Form.Label>
                <Form.Control id="txtDesignation" name="designation" maxLength={50} defaultValue={contactDetailData.designation} onChange={handleFieldChange} placeholder="Designation" />
              </Row>
              <Row className="mb-3">
                <Form.Label>Send Mail</Form.Label>
                <Form.Select id="txtSendMail" name="sendMail" defaultValue={contactDetailData.sendMail} onChange={handleFieldChange}>
                  <option value=''>Select</option>
                  <option value="Y">Yes</option>
                  <option value="N">No</option>
                </Form.Select>
              </Row>
              <Row className="mb-3">
                <Button variant="primary" id='btnAddContactDetail' type="button" onClick={() => handleSubmit()}>
                  Add
                </Button>
              </Row>
              <Row className="mb-3">
                <Button variant="primary" id='btnUpdateContactDetail' onClick={() => updateContactDetails()}>
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
      }
    </>
  )
};


export default ContactDetails;