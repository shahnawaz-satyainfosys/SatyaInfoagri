import React from 'react';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
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

  const [contactList, setContactList] = useState([]);

  useEffect(() => {
    //getClientContactDetailsList();

    const count = $('#ContactDetailsTable tr').length;    
    if (count > 1) {
      document.getElementById("ContactDetailsTable").style.display = "block";
    }
  }, []);

  const showForm = () => {
    document.getElementById("ContactDetails").style.display = "block";
    document.getElementById("btnAdd").style.display = "none";
  }

  const getClientContactDetailsList = async () => {
    const clientData = {
      EncryptedClientCode: localStorage.getItem("EncryptedResponseClientCode")
    }
    axios
      .post(process.env.REACT_APP_API_URL + '/get-client-contact-detail-list', clientData)
      .then(res => {
        if (res.data.status == 200) {
          let contactDetailsData = [];
          if (res.data && res.data.data.length > 0)
            contactDetailsData = res.data.data;
          setContactList(contactDetailsData);
        } else {
          toast.error(res.data.message, {
            theme: 'colored'
          });
        }
      });
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Button id='btnAdd' onClick={() => showForm()}>
          Add Contact Detail
        </Button>
      </div>
      <table className='table table-striped' id="ContactDetailsList">
        <thead>
          <tr>
            <th>Contact Person</th>
            <th>Mobile No</th>
            <th>Email Id</th>
            <th>Send Mail</th>
          </tr>
        </thead>
        <tbody id='tableContactPerson'>
          {contactList.map((contact) => {
            return (
              <tr>
                <td>{contact.contactPerson}</td>
                <td>{contact.mobileNo}</td>
                <td>{contact.emailId}</td>
                <td>{contact.sendMail}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
};

export default ContactDetails;