import React from 'react';
import { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { clientDetailsAction } from '../../actions/index';
// import TabPage from 'components/common/TabPage';

export const ClientDetails = () => {

  const dispatch = useDispatch();

  const clientDetailsReducer = useSelector((state) => state.rootReducer.clientDetailsReducer)
  const clientData = clientDetailsReducer.clientDetails;
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [billingStateList, setBillingStateList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formHasError, setFormError] = useState(false);
  const [customerNameErr, setCustomerNameErr] = useState({});
  const [clientAddressErr, setClientAddressErr] = useState({});
  const [countryErr, setCountryErr] = useState({});
  const [stateErr, setStateErr] = useState({});
  const [billingAddressErr, setBillingAddressErr] = useState({});
  const [billingCountryErr, setBillingCountryErr] = useState({});
  const [billingStateErr, setBillingStateErr] = useState({});
  const [panNoErr, setPanNoErr] = useState({});
  const [gstNoErr, setGstNoErr] = useState({});
  const [noOfCompaniesErr, setNoOfCompaniesErr] = useState({});
  const [noOfUsersErr, setNoOfUsersErr] = useState({});

  useEffect(() => {
    getCountries();
  }, []);

  const getCountries = async () => {
    axios
      .get(process.env.REACT_APP_API_URL + '/country-list')
      .then(res => {
        if (res.data.status == 200) {
          let countryData = [];
          if (res.data && res.data.data.length > 0)
            res.data.data.forEach(country => {
              countryData.push({
                key: country.countryName,
                value: country.encryptedCountryCode
              });
            });
          setCountryList(countryData);
        }
      });
  }

  const getStates = async (EncryptedClientCountryCode, isBillingCountry) => {
    const userData = {
      EncryptedCountryCode: EncryptedClientCountryCode
    }

    axios
      .post(process.env.REACT_APP_API_URL + '/state-list', userData)
      .then(res => {

        let stateData = [];

        if (res.data.status == 200) {
          if (res.data && res.data.data.length > 0) {
            res.data.data.forEach(state => {
              stateData.push({
                key: state.stateName,
                value: state.encryptedStateCode
              });
            });
          }
        }

        if (isBillingCountry)
          setBillingStateList(stateData);
        else
          setStateList(stateData);
      });
  }

  const handleValidation = () => {
    const customerNameErr = {};
    const clientAddressErr = {};
    const countryErr = {};
    const stateErr = {};
    const billingAddressErr = {};
    const billingCountryErr = {};
    const billingStateErr = {};
    const panNoErr = {};
    const gstNoErr = {};
    const noOfCompaniesErr = {};
    const noOfUsersErr = {};

    let isValid = true;

    if (!clientData.customerName) {
      customerNameErr.nameEmpty = "Enter customer name";
      isValid = false;
      setFormError(true);
    }

    if (!clientData.address1) {
      clientAddressErr.addressEmpty = "Enter address";
      isValid = false;
      setFormError(true);
    }

    if (!clientData.country) {
      countryErr.countrySelect = "Select country";
      isValid = false;
      setFormError(true);
    }

    if (!clientData.state) {
      stateErr.stateSelect = "Select state";
      isValid = false;
      setFormError(true);
    }

    if (!clientData.billingAddress1) {
      billingAddressErr.billAddressEmpty = "Enter billing address";
      isValid = false;
      setFormError(true);
    }

    if (!clientData.billingCountry) {
      billingCountryErr.billCountryEmpty = "Select billing country";
      isValid = false;
      setFormError(true);
    }

    if (!clientData.billingState) {
      billingStateErr.billStateEmpty = "Select billing state";
      isValid = false;
      setFormError(true);
    }

    if (!clientData.panNumber) {
      panNoErr.panNoEmpty = "Enter PAN number";
      isValid = false;
      setFormError(true);
    }
    // } else if (!(/[A-Z]{3}[CPHFATBLJG][A-Z]\d{4}[A-Z]/.test(clientData.PanNo))) {
    //   panNoErr.panNoInvalid = "Enter valid PAN number";
    //   isValid = false;
    //   setFormError(true);
    // }

    if (!clientData.gstNumber) {
      gstNoErr.gstNoEmpty = "Enter GST number";
      isValid = false;
      setFormError(true);
    }
    // else if (!(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(clientData.GstNo))) {
    //   gstNoErr.gstNoInvalid = "Enter valid GST number";
    //   isValid = false;
    //   setFormError(true);
    // }

    if (clientData.noOfComapnies <= 0) {
      noOfCompaniesErr.noOfCompaniesEmpty = "Number of companies must be greater than 0";
      isValid = false;
      setFormError(true);
    }

    if (clientData.noOfUsers <= 0) {
      noOfUsersErr.noOfUsersEmpty = "Number of users must be greater than 0";
      isValid = false;
      setFormError(true);
    }

    if (!isValid) {
      setCustomerNameErr(customerNameErr);
      setClientAddressErr(clientAddressErr);
      setCountryErr(countryErr);
      setStateErr(stateErr);
      setBillingAddressErr(billingAddressErr);
      setBillingCountryErr(billingCountryErr);
      setBillingStateErr(billingStateErr);
      setPanNoErr(panNoErr);
      setGstNoErr(gstNoErr);
      setNoOfCompaniesErr(noOfCompaniesErr);
      setNoOfUsersErr(noOfUsersErr);
    }

    return isValid;
  }

  const handleSubmit = () => {
    if (handleValidation()) {
      const userData = {
        ClientName: clientData.customerName,
        ClientAddress1: clientData.address1,
        ClientAddress2: clientData.address2 ? clientData.address2 : '',
        ClientAddress3: clientData.address3 ? clientData.address3 : '',
        PINCode: clientData.pinCode ? clientData.pinCode : '',
        EncryptedCountryCode: clientData.country,
        EncryptedStateCode: clientData.state,
        ClientBillAddress1: clientData.billingAddress1,
        ClientBillAddress2: clientData.billingAddress2 ? clientData.billingAddress2 : '',
        ClientBillAddress3: clientData.billingAddress3 ? clientData.billingAddress3 : '',
        BillPINCode: clientData.billingPinCode,
        EncryptedBillCountryCode: clientData.billingCountry,
        EncryptedBillStateCode: clientData.billingState,
        ClientPANNO: clientData.panNumber,
        ClientGSTNO: clientData.gstNumber,
        ActiveStatus: clientData.status,
        NoOfCompany: parseInt(clientData.noOfComapnies),
        NoOfUsers: parseInt(clientData.noOfUsers),
        AddUser: localStorage.getItem("LoginUserName")
      }

      setIsLoading(true);

      axios.post(process.env.REACT_APP_API_URL + '/add-client', userData)
        .then(res => {
          debugger
          setIsLoading(false);
          if (res.data.status == 200) {
            toast.success(res.data.message, {
              theme: 'colored'
            });
            $("#AddContactDetailsForm").show();
            localStorage.setItem('EncryptedResponseClientCode', res.data.data.encryptedClientCode);
            $("#AddClientDetailsForm :input").prop("disabled", true);
          } else {
            toast.error(res.data.message, {
              theme: 'colored'
            });
          }
        })
    }
  };

  const updateClientDetails = () => {
    if (handleValidation()) {
      const updatedUserData = {
        EncryptedClientCode: clientData.encryptedClientCode,
        ClientName: clientData.customerName,
        ClientAddress1: clientData.address1,
        ClientAddress2: clientData.address2,
        ClientAddress3: clientData.address3,
        PINCode: clientData.pinCode,
        EncryptedCountryCode: clientData.country,
        EncryptedStateCode: clientData.state,
        ClientBillAddress1: clientData.billingAddress1,
        ClientBillAddress2: clientData.billingAddress2,
        ClientBillAddress3: clientData.billingAddress3,
        BillPINCode: clientData.billingPinCode,
        EncryptedBillCountryCode: clientData.billingCountry,
        EncryptedBillStateCode: clientData.billingState,
        ClientPANNO: clientData.panNumber,
        ClientGSTNO: clientData.gstNumber,
        ActiveStatus: clientData.status,
        NoOfCompany: parseInt(clientData.noOfComapnies),
        NoOfUsers: parseInt(clientData.noOfUsers),
        ModifyUser: localStorage.getItem("LoginUserName")
      }

      setIsLoading(true);

      axios.post(process.env.REACT_APP_API_URL + '/update-client', updatedUserData,{
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('Token')).value}`}
      })
        .then(res => {
          setIsLoading(false);
          if (res.data.status == 200) {
            toast.success(res.data.message, {
              theme: 'colored'
            });            
          } else {
            toast.error(res.data.message, {
              theme: 'colored'
            });
          }
        })
    }
  };

  const handleFieldChange = e => {
    dispatch(clientDetailsAction({
      ...clientData,
      [e.target.name]: e.target.value
    }));

    if (e.target.name == "country") {
      if (e.target.value == '')
        setStateList([]);
      else
        getStates(e.target.value);
    }

    if (e.target.name == "billingCountry") {
      if (e.target.value == '')
        setBillingStateList([]);
      else
        getStates(e.target.value, true);
    }
  };

  const showForm = () => {
    $("#AddContactDetailsForm").show();
  }

  return (
    <>
      {isLoading ? (
        <Spinner
          className="position-absolute start-50 loader-color"
          animation="border"
        />
      ) : null}
      <Form noValidate validated={formHasError} className="details-form" onSubmit={e => { handleSubmit(e) }} id='AddClientDetailsForm'>
        <Row>
          <Col className="me-5 ms-5">
            <Row className="mb-3">
              <Form.Label>Customer Name<span className="text-danger">*</span></Form.Label>
              <Form.Control id="txtCustomerName" name="customerName" maxLength={50} defaultValue={clientData.customerName} onChange={handleFieldChange} placeholder="Customer Name" required />
              {Object.keys(customerNameErr).map((key) => {
                return <span className="error-message">{customerNameErr[key]}</span>
              })}
            </Row>
            <Row className="mb-3">
              <Form.Label>Customer Address<span className="text-danger">*</span></Form.Label>
              <Form.Control id="txtCustomerAddress" name="address1" maxLength={50} defaultValue={clientData.address1} onChange={handleFieldChange} className="mb-1" placeholder="Address" required />
              {Object.keys(clientAddressErr).map((key) => {
                return <span className="error-message">{clientAddressErr[key]}</span>
              })}
              <Form.Control id="txtCustomerAddress2" name="address2" maxLength={50} defaultValue={clientData.address2} onChange={handleFieldChange} className="mb-1" placeholder="Address 2" />
              <Form.Control id="txtCustomerAddress3" name="address3" maxLength={50} defaultValue={clientData.address3} nChange={handleFieldChange} className="mb-1" placeholder="Address 3" />
            </Row>
            <Row className="mb-3">
              <Form.Label>Pincode</Form.Label>
              <Form.Control id="txtPincode" name="pincode" maxLength={10} defaultValue={clientData.pinCode} onChange={handleFieldChange} placeholder="Pincode" />
            </Row>
            <Row className="mb-3">
              <Form.Label>Country<span className="text-danger">*</span></Form.Label>
              <Form.Select id="txtCountry" name="country" defaultValue={clientData.country} onChange={handleFieldChange} required>
                <option value=''>Select country</option>
                {countryList.map((option, index) => (
                  <option key={index} value={option.value}>{option.key}</option>
                ))}
              </Form.Select>
              {Object.keys(countryErr).map((key) => {
                return <span className="error-message">{countryErr[key]}</span>
              })}
            </Row>
            <Row className="mb-3">
              <Form.Label>State<span className="text-danger">*</span></Form.Label>
              <Form.Select id="txtState" name="state" defaultValue={clientData.state} onChange={handleFieldChange} required>
                <option value=''>Select state</option>
                {stateList.map((option, index) => (
                  <option key={index} value={option.value}>{option.key}</option>
                ))}
              </Form.Select>
              {Object.keys(stateErr).map((key) => {
                return <span className="error-message">{stateErr[key]}</span>
              })}
            </Row>
          </Col>

          <Col className="me-5 ms-5">
            <Row className="mb-3">
              <Form.Label>Billing Address<span className="text-danger">*</span></Form.Label>
              <Form.Control id="txtBillingAddress" name="billingAddress1" maxLength={50} defaultValue={clientData.billingAddress1} onChange={handleFieldChange} className="mb-1" placeholder="Billing Address" required />
              {Object.keys(billingAddressErr).map((key) => {
                return <span className="error-message">{billingAddressErr[key]}</span>
              })}
              <Form.Control id="txtBillingAddress2" name="billingAddress2" maxLength={50} defaultValue={clientData.billingAddress2} onChange={handleFieldChange} className="mb-1" placeholder="Billing Address 2" />
              <Form.Control id="txtBillingAddress3" name="billingAddress3" maxLength={50} defaultValue={clientData.billingAddress3} onChange={handleFieldChange} className="mb-1" placeholder="Billing Address 3" />
            </Row>
            <Row className="mb-3">
              <Form.Label>Pincode</Form.Label>
              <Form.Control id="txtBillingPincode" name="billingPincode" maxLength={10} defaultValue={clientData.billingPinCode} onChange={handleFieldChange} placeholder="Pincode" />
            </Row>
            <Row className="mb-3">
              <Form.Label>Country<span className="text-danger">*</span></Form.Label>
              <Form.Select id="txtBillingCountry" name="billingCountry" defaultValue={clientData.billingCountry} onChange={handleFieldChange} required>
                <option value=''>Select country</option>
                {countryList.map((option, index) => (
                  <option key={index} value={option.value}>{option.key}</option>
                ))}
              </Form.Select>
              {Object.keys(billingCountryErr).map((key) => {
                return <span className="error-message">{billingCountryErr[key]}</span>
              })}
            </Row>
            <Row className="mb-3">
              <Form.Label>State<span className="text-danger">*</span></Form.Label>
              <Form.Select id="txtBillingState" name="billingState" defaultValue={clientData.billingState} onChange={handleFieldChange} required>
                <option value=''>Select state</option>
                {billingStateList.map((option, index) => (
                  <option key={index} value={option.value}>{option.key}</option>
                ))}
              </Form.Select>
              {Object.keys(billingStateErr).map((key) => {
                return <span className="error-message">{billingStateErr[key]}</span>
              })}
            </Row>
          </Col>

          <Col className="me-5 ms-5">
            <Row className="mb-3">
              <Form.Label>PAN No.<span className="text-danger">*</span></Form.Label>
              <Form.Control id="txtPAN" name="panNumber" maxLength={20} defaultValue={clientData.panNumber} onChange={handleFieldChange} placeholder="PAN No." required />
              {Object.keys(panNoErr).map((key) => {
                return <span className="error-message">{panNoErr[key]}</span>
              })}
            </Row>
            <Row className="mb-3">
              <Form.Label>GST No.<span className="text-danger">*</span></Form.Label>
              <Form.Control id="txtGST" name="gstNumber" maxLength={20} defaultValue={clientData.gstNumber} onChange={handleFieldChange} placeholder="GST No." required />
              {Object.keys(gstNoErr).map((key) => {
                return <span className="error-message">{gstNoErr[key]}</span>
              })}
            </Row>
            <Row className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select id="txtStatus" name="status" defaultValue={clientData.status} onChange={handleFieldChange}>
                <option value=''>Select status</option>
                <option value="A">Active</option>
                <option value="S">Supspended</option>
              </Form.Select>
            </Row>
            <Row className="mb-3">
              <Form.Label>No. of Companies</Form.Label>
              <Form.Control type='number' min={1} id="numNoOfCompanies" max={9999} defaultValue={clientData.noOfComapnies} name="noOfCompanies" onChange={handleFieldChange} placeholder="No. of Companies" required />
              {Object.keys(noOfCompaniesErr).map((key) => {
                return <span className="error-message">{noOfCompaniesErr[key]}</span>
              })}
            </Row>
            <Row className="mb-3">
              <Form.Label>No. of Users</Form.Label>
              <Form.Control type='number' min={1} id="numNoOfUsers" max={9999} defaultValue={clientData.noOfUsers} name="noOfUsers" onChange={handleFieldChange} placeholder="No. of Users" required />
              {Object.keys(noOfUsersErr).map((key) => {
                return <span className="error-message">{noOfUsersErr[key]}</span>
              })}
            </Row>
            <Row className="mb-3">
              <Button id='btnUpdateClientDetail' onClick={() => updateClientDetails()}>Update</Button>
            </Row>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default ClientDetails;