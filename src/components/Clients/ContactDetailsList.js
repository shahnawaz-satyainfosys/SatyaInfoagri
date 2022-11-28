import React from 'react';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ContactDetailsList = () => {
  
  const contactDetailReducer = useSelector((state) => state.rootReducer.clientContactDetailsReducer)

  useEffect(() => {
    
    const count = $('#ContactDetailsTable tr').length;    
    if (count > 1) {
      $("#ContactDetailsTable").show();
    }
  }, []);

  const deleteContactDetails = (encryptedClientContactDetailsId) => {
    
    const deleteRequest = {
      EncryptedClientContactDetailsId: encryptedClientContactDetailsId
    }

    axios
      .delete(process.env.REACT_APP_API_URL + '/delete-client-contact-detail', deleteRequest)
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
                <td>{data.sendMail == 'Y' ? "Yes" : "No" }</td>
                <td><i className="fa fa-pencil me-2"/> <i className="fa fa-trash" onClick={() => deleteContactDetails(data.encryptedClientContactDetailId)} /></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
};

export default ContactDetailsList;