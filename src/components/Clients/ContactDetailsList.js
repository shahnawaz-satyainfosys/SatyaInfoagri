import React from 'react';
import { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { updateClientContactDetailsAction } from '../../actions/index';

const ContactDetailsList = () => {

  const dispatch = useDispatch();
  const contactDetailReducer = useSelector((state) => state.rootReducer.clientContactDetailsReducer)  
  const [modalShow, setModalShow] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    const count = $('#ContactDetailsTable tr').length;
    if (count > 1) {
      $("#ContactDetailsTable").show();
    }
  }, []);

  const editContactDetails = (data) => {
    $("#AddContactDetailsForm").show();
    $("#btnAddContactDetail").hide();
    $("#btnUpdateContactDetail").show();
    $("#btnAdd").hide();
    $("#ContactDetailsTable").hide();
    dispatch(updateClientContactDetailsAction(data));
  }

  const deleteContactDetails = (encryptedClientContactDetailsId) => {
    const data = {
      encryptedClientContactDetailsId
    }
    setIsLoading(true);
    axios
      .delete(process.env.REACT_APP_API_URL + '/delete-client-contact-detail', { data })
      .then(res => {
        setIsLoading(false);
        if (res.data.status == 200) {
          toast.success(res.data.message, {
            theme: 'colored'
          });
        }
        else {
          toast.error(res.data.message, {
            theme: 'colored'
          });
        }
      })
  }

  const showAddContactDetailsForm = () => {
    $("#AddContactDetailsForm").show();
    //$("#AddContactForm")[0].reset();
    $("#btnAddContactDetail").show();
    $("#btnUpdateContactDetail").hide();
    $("#ContactDetailsTable").hide();
    $("#btnAdd").hide();
  }

  return (
    <>
    {isLoading ? (
        <Spinner
          className="position-absolute start-50 loader-color"
          animation="border"
        />
      ) : null}
      
    <div>
      <div className='mb-3 me-5' style={{ display: "flex", justifyContent: "end" }}>
        <Button id='btnAdd' onClick={() => showAddContactDetailsForm()}>
          Add Contact Detail
        </Button>
      </div>
      {contactDetailReducer &&
          contactDetailReducer.clientContactDetails && 
           contactDetailReducer.clientContactDetails.length > 0 &&
      <table className='table table-striped' id="ClientContactDetailsTable">
        <thead>
          <tr>
            <th>Contact Person</th>
            <th>Mobile No</th>
            <th>Email Id</th>
            <th>Designation</th>
            <th>Send Mail</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody id='tableContactPerson'>
          
           {contactDetailReducer.clientContactDetails.map(data =>
            <tr>
              <td>{data.contactPerson}</td>
              <td>{data.mobileNo}</td>
              <td>{data.emailId}</td>
              <td>{data.designation}</td>
              <td>{data.sendMail == 'Y' ? "Yes" : "No"}</td>
              <td><i className="fa fa-pencil me-2" onClick={() => { editContactDetails(data) }} /> <i className="fa fa-trash" onClick={() => { deleteContactDetails(data.encryptedClientContactDetailsId) }} /></td>
            </tr>
          )}
        </tbody>
      </table>}
    </div>

    <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Are you sure, you want to delete this contact delete.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary">Confirm</Button>
          <Button onClick={() => setModalShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

    </>
  )
};

export default ContactDetailsList;