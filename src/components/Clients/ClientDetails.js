import React from 'react';
import { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import axios from 'axios';

export const ClientDetails = () => {

  const [formData, setFormData] = useState({
    customerName: '',
    clientAddress: '',
    clientAddress2: '',
    clientAddress3: '',
    pincode: '',
    country: [],
    state: [],
    billingAddress: '',
    billingAddress2: '',
    billingAddress3: '',
    billingPincode: '',
    billingCountry: [],
    billingState: [],
    PanNo: '',
    GstNo: '',
    status: '',
    noOfCompanies: 1,
    noOfUsers: 1,
  });
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);

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

  const handleSubmit = e => {
    e.preventDefault();
  };

  const handleFieldChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Form className="details-form" onSubmit={e => { handleSubmit(e) }}>
      <Row>
        <Col className="me-5 ms-5">
          <Row className="mb-3">
            <Form.Label>Customer Name *</Form.Label>
            <Form.Control id="txtCustomerName" name="customerName" maxLength={50} onChange={handleFieldChange} placeholder="Customer Name" required />
          </Row>
          <Row className="mb-3">
            <Form.Label>Customer Address *</Form.Label>
            <Form.Control id="txtCustomerAddress" name="clientAddress" maxLength={50} onChange={handleFieldChange} className="mb-1" placeholder="Address" required />
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
          </Row>

          <Row className="mb-3">
            <Form.Label>State *</Form.Label>
            <Form.Select id="txtState" name="state" onChange={handleFieldChange} required>
              <option value=''>Select state</option>
              {stateList.map((option, index) => (
                <option key={index} value={option.value}>{option.key}</option>
              ))}
            </Form.Select>
          </Row>
        </Col>
        <Col className="me-5 ms-5">
          <Row className="mb-3">
            <Form.Label>Billing Address *</Form.Label>
            <Form.Control id="txtBillingAddress" name="billingAddress" maxLength={50} onChange={handleFieldChange} className="mb-1" placeholder="Billing Address" required />
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
          </Row>
          <Row className="mb-3">
            <Form.Label>State *</Form.Label>
            <Form.Select id="txtBillingState" name="billingState" onChange={handleFieldChange} required>
              <option value=''>Select state</option>
              {stateList.map((option, index) => (
                <option key={index} value={option.value}>{option.key}</option>
              ))}
            </Form.Select>
          </Row>
        </Col>
        <Col className="me-5 ms-5">
          <Row className="mb-3">
            <Form.Label>PAN No. *</Form.Label>
            <Form.Control id="txtPAN" name="PanNo" maxLength={20} onChange={handleFieldChange} placeholder="PAN No." required />
          </Row>
          <Row className="mb-3">
            <Form.Label>GST No *</Form.Label>
            <Form.Control id="txtGST" name="GstNo" maxLength={20} onChange={handleFieldChange} placeholder="GST No." required />
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
          </Row>
          <Row className="mb-3">
            <Form.Label>No. of Users</Form.Label>
            <Form.Control type='number' min={1} id="txtPassword" max={9999} value={formData.noOfUsers} name="noOfUsers" onChange={handleFieldChange} placeholder="No. of Users" required />
          </Row>
          <Row className="mb-3">
            <Button variant="primary" type="submit">
              Add
            </Button>
          </Row>
        </Col>
      </Row>
    </Form>
  )
}

export default ClientDetails;