import React from 'react';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { updateClientContactDetailsAction } from '../../actions/index';

const ContactDetailsList = () => {

  const dispatch = useDispatch();
  const contactDetailReducer = useSelector((state) => state.rootReducer.clientContactDetailsReducer)
  const [modalShow, setModalShow] = useState(false);
  const [encryptedClientContactDetailId, setEncryptedClientContactDetailId] = useState('');

  useEffect(() => {

    const count = $('#ContactDetailsTable tr').length;
    if (count > 1) {
      $("#ContactDetailsTable").show();
    }
  }, []);

  const editContactDetails = (data) => {
    $("#AddContactDetailsForm").show();
    dispatch(updateClientContactDetailsAction(data));
  }

  const deleteContactDetails = (encryptedClientContactDetailsId) => {
    const data = {
      encryptedClientContactDetailsId
    }

    axios
      .delete(process.env.REACT_APP_API_URL + '/delete-client-contact-detail', { data })
      .then(res => {
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

  const showForm = () => {
    $("#AddContactDetailsForm").show();
    $("#btnAdd").hide();
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Button id='btnAdd' onClick={() => showForm()}>
          Add Contact Detail
        </Button>
      </div>
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
          {contactDetailReducer && contactDetailReducer.clientContactDetails.map(data =>
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
      </table>

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
          <Button variant="primary" onClick={() => deleteContactDetails('')} >Confirm</Button>
          <Button onClick={() => setModalShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
};

export default ContactDetailsList;