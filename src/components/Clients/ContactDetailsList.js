import React from 'react';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';

const ContactDetailsList = () => {

  useEffect(() => {
    const count = $('#ContactDetailsTable tr').length;    
    if (count > 1) {
      $("#ContactDetailsTable").show();
    }
  }, []);

  const showForm = () => {
    $("#AddContactDetailsForm").show();
    $("#btnAdd").hide();
  }

  return (
    <>
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
            <th>Send Mail</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody id='tableContactPerson'>
        </tbody>
      </table>
    </>
  )
};

export default ContactDetailsList;