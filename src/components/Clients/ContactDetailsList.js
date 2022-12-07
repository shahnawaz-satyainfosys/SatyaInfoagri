import React from 'react';
import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateClientContactDetailsAction } from '../../actions/index';
import { clientContactDetailsAction } from '../../actions/index';

const ContactDetailsList = () => {

  const dispatch = useDispatch();
  const contactDetailReducer = useSelector((state) => state.rootReducer.clientContactDetailsReducer)
  const clientDetailsErrorReducer = useSelector((state) => state.rootReducer.clientDetailsErrorReducer)
  const clientError = clientDetailsErrorReducer.clientDetailsError;
  const [paramsData, setParamsData] = useState({});

  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {

    const count = $('#ContactDetailsTable tr').length;
    if (count > 1) {
      $("#ContactDetailsTable").show();
    }
  }, []);

  const editContactDetails = (data, mobileNoToUpdate) => {
    $("#AddContactDetailsForm").show();
    $("#btnAddContactDetail").hide();
    $("#btnUpdateContactDetail").show();
    $("#btnAdd").hide();
    $("#ContactDetailsTable").hide();
    localStorage.setItem("contactPersonMobileNoToUpdate", mobileNoToUpdate);
    dispatch(updateClientContactDetailsAction(data));
  }

  const ModalPreview = (encryptedClientContactDetailsId, contactMobileNoToDelete) => {
    setModalShow(true);
    setParamsData({encryptedClientContactDetailsId, contactMobileNoToDelete});
  }
  const deleteContactDetails = () => {

    if(!paramsData)
        return false;
    
    var objectIndex = contactDetailReducer.clientContactDetails.findIndex(x => x.mobileNo == paramsData.contactMobileNoToDelete);
    contactDetailReducer.clientContactDetails.splice(objectIndex, 1)

    localStorage.setItem("DeleteContactDetailsId", paramsData.encryptedClientContactDetailsId)

    dispatch(clientContactDetailsAction(contactDetailReducer.clientContactDetails));
    setModalShow(false);
  }

  const showAddContactDetailsForm = () => {
    $("#AddContactDetailsForm").show();
    $("#btnAddContactDetail").show();
    $("#btnUpdateContactDetail").hide();
    $("#ContactDetailsTable").hide();
    if ($('#ContactDetailsTable tr').length > 1) {
      $("#ContactDetailsTable").show();
    } else {
      $("#ContactDetailsTable").hide();
    }
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

      {modalShow && paramsData &&
        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Are you sure, you want to delete this contact detail?</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={() => setModalShow(false)}>Cancel</Button>
            <Button variant="danger" onClick={() => deleteContactDetails()}>Delete</Button>
          </Modal.Footer>
        </Modal>
      }

      <div>
        <div className='mb-3 me-5' style={{ display: "flex", justifyContent: "end" }}>
          <Button id='btnAdd' onClick={() => showAddContactDetailsForm()}>
            Add Contact Detail
          </Button>
        </div>
        {
          clientError.contactDetailErr &&
          (
            <div className='mb-3'>
              <span className="error-message">{clientError.contactDetailErr.contactEmpty}</span>
            </div>
          )
        }
        {contactDetailReducer &&
          contactDetailReducer.clientContactDetails &&
          contactDetailReducer.clientContactDetails.length > 0 && (
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

                {contactDetailReducer.clientContactDetails.length > 0 ?

                  contactDetailReducer.clientContactDetails.map((data, index) =>
                  (data &&
                    <tr>
                      <td>{data.contactPerson}</td>
                      <td>{data.mobileNo}</td>
                      <td>{data.emailId}</td>
                      <td>{data.designation}</td>
                      <td>{data.sendMail == 'Y' ? "Yes" : "No"}</td>
                      <td><i className="fa fa-pencil me-2" onClick={() => { editContactDetails(data, data.mobileNo) }} />
                        <i className="fa fa-trash" onClick={() => { ModalPreview(data.encryptedClientContactDetailsId, data.mobileNo) }} /></td>
                    </tr>)
                  )
                  : null}
              </tbody>
            </table>)}
      </div>
    </>
  )
};

export default ContactDetailsList;