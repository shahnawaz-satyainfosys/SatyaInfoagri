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

  const resetContactDetailData = () => {
    contactDetailData = {
      contactPerson: '',
      mobileNo: '',
      emailId: '',
      designation: '',
      sendMail: ''
    }
  }

  const contactDetailListReducer = useSelector((state) => state.rootReducer.clientContactDetailsReducer)
  const contactDetailList = contactDetailListReducer.clientContactDetails;

  const updateClientContactDetailReducer = useSelector((state) => state.rootReducer.updateClientContactDetailReducer)
  var contactDetailData = updateClientContactDetailReducer.updateClientContactDetails;

  if (!updateClientContactDetailReducer.updateClientContactDetails ||
       updateClientContactDetailReducer.updateClientContactDetails.length <= 0) {
        resetContactDetailData();
  }

  const [formHasError, setFormError] = useState(false);
  const [contactNameErr, setContactNameErr] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateContactDetailForm = () => {
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

  const addContactDetailInList = () => {
    if (validateContactDetailForm()) {

      const userData = {
        encryptedClientContactDetailsId: "",
        encryptedClientCode: localStorage.getItem("EncryptedResponseClientCode"),
        contactPerson: contactDetailData.contactPerson,
        mobileNo: contactDetailData.mobileNo,
        emailId: contactDetailData.emailId,
        designation: contactDetailData.designation,
        sendMail: contactDetailData.sendMail,
        addUser: localStorage.getItem("LoginUserName")
      }

      dispatch(clientContactDetailsAction(userData));
      hideForm();
    } 
  };

  const updateContactDetails = () => {

    if (validateContactDetailForm()) {
      
      var contactPersonMobileNoToUpdate = localStorage.getItem("contactPersonMobileNoToUpdate");

      const contactDetail = {
        encryptedClientContactDetailsId: contactDetailData.encryptedClientContactDetailsId,
        encryptedClientCode: contactDetailData.encryptedClientCode,
        contactPerson: contactDetailData.contactPerson,
        mobileNo: contactDetailData.mobileNo,
        emailId: contactDetailData.emailId,
        designation: contactDetailData.designation,
        sendMail: contactDetailData.sendMail == "Y" ? "Y" : "N",
        addUser: contactDetailData.addUser,
        modifyUser: localStorage.getItem("LoginUserName")
      }

      var objectIndex = contactDetailList.findIndex(x => x.mobileNo == contactPersonMobileNoToUpdate);
      contactDetailList[objectIndex] = contactDetail;

      dispatch(clientContactDetailsAction(contactDetailList));

      $("#ContactDetailsTable").show();
      $("#AddContactDetailsForm").hide();

      localStorage.setItem("contactPersonMobileNoToUpdate", "");

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
    resetContactDetailData();
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
        <Form noValidate validated={formHasError} className="details-form" id='AddContactForm'>
          <Row>
            <Col className="me-5 ms-5">
              <Row className="mb-3">
                <Form.Label className='details-form'>Contact Person<span className="text-danger">*</span></Form.Label>
                <Form.Control id="txtContactPerson" name="contactPerson" maxLength={50} value={contactDetailData.contactPerson} onChange={handleFieldChange} placeholder="Contact person name" required />
                {Object.keys(contactNameErr).map((key) => {
                  return <span className="error-message">{contactNameErr[key]}</span>
                })}
              </Row>
              <Row className="mb-3">
                <Form.Label>Mobile No</Form.Label>
                <Form.Control id="txtMobileno" name="mobileNo" maxLength={10} value={contactDetailData.mobileNo} onChange={handleFieldChange} placeholder="Mobile No" />
              </Row>
              <Row className="mb-3">
                <Form.Label>Email Id</Form.Label>
                <Form.Control id="txtEmailId" name="emailId" maxLength={50} value={contactDetailData.emailId} onChange={handleFieldChange} placeholder="Email Id" />
              </Row>
            </Col>
            <Col>
              <Row className="mb-3">
                <Form.Label>Designation</Form.Label>
                <Form.Control id="txtDesignation" name="designation" maxLength={50} value={contactDetailData.designation} onChange={handleFieldChange} placeholder="Designation" />
              </Row>
              <Row className="mb-3">
                <Form.Label>Send Mail</Form.Label>
                <Form.Select id="txtSendMail" name="sendMail" value={contactDetailData.sendMail} onChange={handleFieldChange}>
                  <option value=''>Select</option>
                  <option value="Y">Yes</option>
                  <option value="N">No</option>
                </Form.Select>
              </Row>
              <Row className="mb-3">
                <Button variant="primary" id='btnAddContactDetail' type="button" onClick={() => addContactDetailInList()}>
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