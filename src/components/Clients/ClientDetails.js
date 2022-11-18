import React from 'react';
import { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

export const ClientDetails = () => {

  const [formData, setFormData] = useState({
    customerName: '',
    clientAddress: '',
    clientAddress2: '',
    clientAddress3: '',
    pincode: '',
    country: '',
    state: '',
    billingAddress: '',
    billingAddress2: '',
    billingAddress3: '',
    billingPincode: '',
    billingCountry: '',
    billingState: '',
    PanNo: '',
    GstNo: '',
    status: '',
    noOfCompanies: 1,
    noOfUsers: 1,
  });
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
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
    getStates();
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

  const getStates = async () => {
    axios
      .get(process.env.REACT_APP_API_URL + '/state-list')
      .then(res => {
        if (res.data.status == 200) {
          let stateData = [];
          if (res.data && res.data.data.length > 0)
            res.data.data.forEach(state => {
              stateData.push({
                key: state.stateName,
                value: state.encryptedStateCode
              });
            });
          setStateList(stateData);
        }
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

    if (!formData.customerName) {
      customerNameErr.nameEmpty = "Enter customer name.";
      isValid = false;
      setFormError(true);
    }

    if (!formData.clientAddress) {
      clientAddressErr.addressEmpty = "Enter address.";
      isValid = false;
      setFormError(true);
    }

    if (!formData.country) {
      countryErr.countrySelect = "Select valid country.";
      isValid = false;
      setFormError(true);
    }

    if (!formData.state) {
      stateErr.stateSelect = "Select valid state.";
      isValid = false;
      setFormError(true);
    }

    if (!formData.billingAddress) {
      billingAddressErr.billAddressEmpty = "Enter billing address.";
      isValid = false;
      setFormError(true);
    }

    if (!formData.billingCountry) {
      billingCountryErr.billCountryEmpty = "Select valid billing country.";
      isValid = false;
      setFormError(true);
    }

    if (!formData.billingState) {
      billingStateErr.billStateEmpty = "Select valid billing state.";
      isValid = false;
      setFormError(true);
    }

    if (!formData.PanNo) {
      panNoErr.panNoEmpty = "Enter PAN number.";
      isValid = false;
      setFormError(true);
    }

    if (!formData.GstNo) {
      gstNoErr.gstNoEmpty = "Enter GST number.";
      isValid = false;
      setFormError(true);
    }

    if (formData.noOfCompanies <= 0) {
      noOfCompaniesErr.noOfCompaniesEmpty = "Number of companies must be greater than 0.";
      isValid = false;
      setFormError(true);
    }

    if (formData.noOfUsers <= 0) {
      noOfUsersErr.noOfUsersEmpty = "Number of users must be greater than 0.";
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

  const handleSubmit = e => {
    e.preventDefault();

    const form = e.currentTarget;

    if (handleValidation()) {
      const userData = {
        ClientName: formData.customerName,
        ClientAddress1: formData.clientAddress,
        ClientAddress2: formData.clientAddress2,
        ClientAddress3: formData.clientAddress3,
        PINCode: formData.pincode,
        EncryptedCountryCode: formData.country,
        EncryptedStateCode: formData.state,
        ClientBillAddress1: formData.billingAddress,
        ClientBillAddress2: formData.billingAddress2,
        ClientBillAddress3: formData.billingAddress3,
        BillPINCode: formData.billingPincode,
        EncryptedBillCountryCode: formData.billingCountry,
        EncryptedBillStateCode: formData.billingState,
        ClientPANNO: formData.PanNo,
        ClientGSTNO: formData.GstNo,
        ActiveStatus: formData.status,
        NoOfCompany: parseInt(formData.noOfCompanies),
        NoOfUsers: parseInt(formData.noOfUsers),
        AddUser: localStorage.getItem("LoginUserName")
      }

      setIsLoading(true);

      axios.post(process.env.REACT_APP_API_URL + '/add-client', userData)
        .then(res => {
          setIsLoading(false);
          if (res.data.status == 200) {
            toast.success(res.data.message, {
              theme: 'colored'
            });
            localStorage.setItem('EncryptedResponseClientCode', res.data.data.encryptedClientCode);
            setFormData();
          } else {
            toast.error(res.data.message, {
              theme: 'colored'
            });
          }
        })
    }
  };

  const handleFieldChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      {isLoading ? (
        <Spinner
          className="position-absolute start-50 loader-color"
          animation="border"
        />
      ) : null}

      <Form noValidate validated={formHasError} className="details-form" onSubmit={e => { handleSubmit(e) }}>
        <Row>
          <Col className="me-5 ms-5">
            <Row className="mb-3">
              <Form.Label>Customer Name *</Form.Label>
              <Form.Control id="txtCustomerName" name="customerName" maxLength={50} onChange={handleFieldChange} placeholder="Customer Name" required />
              {Object.keys(customerNameErr).map((key) => {
                return <span style={{ color: "red", paddingLeft: "0px", fontSize: "15px" }}>{customerNameErr[key]}</span>
              })}
            </Row>
            <Row className="mb-3">
              <Form.Label>Customer Address *</Form.Label>
              <Form.Control id="txtCustomerAddress" name="clientAddress" maxLength={50} onChange={handleFieldChange} className="mb-1" placeholder="Address" required />
              {Object.keys(clientAddressErr).map((key) => {
                return <span style={{ color: "red", paddingLeft: "0px", fontSize: "15px" }}>{clientAddressErr[key]}</span>
              })}
              <Form.Control id="txtCustomerAddress2" name="clientAddress2" maxLength={50} onChange={handleFieldChange} className="mb-1" placeholder="Address 2" />
              <Form.Control id="txtCustomerAddress3" name="clientAddress3" maxLength={50} onChange={handleFieldChange} className="mb-1" placeholder="Address 3" />
            </Row>
            <Row className="mb-3">
              <Form.Label>Pincode</Form.Label>
              <Form.Control id="txtPincode" name="pincode" maxLength={10} onChange={handleFieldChange} placeholder="Pincode" />
            </Row>
            <Row className="mb-3">
              <Form.Label>Country *</Form.Label>
              <Form.Select id="txtCountry" name="country" onChange={handleFieldChange} required>
                <option value=''>Select country</option>
                {countryList.map((option, index) => (
                  <option key={index} value={option.value}>{option.key}</option>
                ))}
              </Form.Select>
              {Object.keys(countryErr).map((key) => {
                return <span style={{ color: "red", paddingLeft: "0px", fontSize: "15px" }}>{countryErr[key]}</span>
              })}
            </Row>

            <Row className="mb-3">
              <Form.Label>State *</Form.Label>
              <Form.Select id="txtState" name="state" onChange={handleFieldChange} required>
                <option value=''>Select state</option>
                {stateList.map((option, index) => (
                  <option key={index} value={option.value}>{option.key}</option>
                ))}
              </Form.Select>
              {Object.keys(stateErr).map((key) => {
                return <span style={{ color: "red", paddingLeft: "0px", fontSize: "15px" }}>{stateErr[key]}</span>
              })}
            </Row>
          </Col>
          <Col className="me-5 ms-5">
            <Row className="mb-3">
              <Form.Label>Billing Address *</Form.Label>
              <Form.Control id="txtBillingAddress" name="billingAddress" maxLength={50} onChange={handleFieldChange} className="mb-1" placeholder="Billing Address" required />
              {Object.keys(billingAddressErr).map((key) => {
                return <span style={{ color: "red", paddingLeft: "0px", fontSize: "15px" }}>{billingAddressErr[key]}</span>
              })}
              <Form.Control id="txtBillingAddress2" name="billingAddress2" maxLength={50} onChange={handleFieldChange} className="mb-1" placeholder="Billing Address 2" />
              <Form.Control id="txtBillingAddress3" name="billingAddress3" maxLength={50} onChange={handleFieldChange} className="mb-1" placeholder="Billing Address 3" />
            </Row>
            <Row className="mb-3">
              <Form.Label>Pincode</Form.Label>
              <Form.Control id="txtBillingPincode" name="billingPincode" maxLength={10} onChange={handleFieldChange} placeholder="Pincode" />
            </Row>
            <Row className="mb-3">
              <Form.Label>Country *</Form.Label>
              <Form.Select id="txtBillingCountry" name="billingCountry" onChange={handleFieldChange} required>
                <option value=''>Select country</option>
                {countryList.map((option, index) => (
                  <option key={index} value={option.value}>{option.key}</option>
                ))}
              </Form.Select>
              {Object.keys(billingCountryErr).map((key) => {
                return <span style={{ color: "red", paddingLeft: "0px", fontSize: "15px" }}>{billingCountryErr[key]}</span>
              })}
            </Row>
            <Row className="mb-3">
              <Form.Label>State *</Form.Label>
              <Form.Select id="txtBillingState" name="billingState" onChange={handleFieldChange} required>
                <option value=''>Select state</option>
                {stateList.map((option, index) => (
                  <option key={index} value={option.value}>{option.key}</option>
                ))}
              </Form.Select>
              {Object.keys(billingStateErr).map((key) => {
                return <span style={{ color: "red", paddingLeft: "0px", fontSize: "15px" }}>{billingStateErr[key]}</span>
              })}
            </Row>
          </Col>
          <Col className="me-5 ms-5">
            <Row className="mb-3">
              <Form.Label>PAN No. *</Form.Label>
              <Form.Control id="txtPAN" name="PanNo" maxLength={20} onChange={handleFieldChange} placeholder="PAN No." required />
              {Object.keys(panNoErr).map((key) => {
                return <span style={{ color: "red", paddingLeft: "0px", fontSize: "15px" }}>{panNoErr[key]}</span>
              })}
            </Row>
            <Row className="mb-3">
              <Form.Label>GST No *</Form.Label>
              <Form.Control id="txtGST" name="GstNo" maxLength={20} onChange={handleFieldChange} placeholder="GST No." required />
              {Object.keys(gstNoErr).map((key) => {
                return <span style={{ color: "red", paddingLeft: "0px", fontSize: "15px" }}>{gstNoErr[key]}</span>
              })}
            </Row>
            <Row className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select id="txtStatus" name="status" onChange={handleFieldChange}>
                <option value=''>Select status</option>
                <option value="A">Active</option>
                <option value="S">Expired</option>
              </Form.Select>
            </Row>
            <Row className="mb-3">
              <Form.Label>No. of Companies</Form.Label>
              <Form.Control type='number' min={1} id="txtUserId" max={9999} value={formData.noOfCompanies} name="noOfCompanies" onChange={handleFieldChange} placeholder="No. of Companies" required />
              {Object.keys(noOfCompaniesErr).map((key) => {
                return <span style={{ color: "red", paddingLeft: "0px", fontSize: "15px" }}>{noOfCompaniesErr[key]}</span>
              })}
            </Row>
            <Row className="mb-3">
              <Form.Label>No. of Users</Form.Label>
              <Form.Control type='number' min={1} id="txtPassword" max={9999} value={formData.noOfUsers} name="noOfUsers" onChange={handleFieldChange} placeholder="No. of Users" required />
              {Object.keys(noOfUsersErr).map((key) => {
                return <span style={{ color: "red", paddingLeft: "0px", fontSize: "15px" }}>{noOfUsersErr[key]}</span>
              })}
            </Row>
            <Row className="mb-3">
              <Button variant="primary" type="submit">
                Add
              </Button>
            </Row>
          </Col>
        </Row>
      </Form>      
    </>
  )
}

export default ClientDetails;