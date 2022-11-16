import React from 'react';
import { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import axios from 'axios';

export const ClientDetails = () => {

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

  return (
    <Form className="details-form">
      <Row>
        <Col className="me-5 ms-5">
          <Row className="mb-3">
            <Form.Label>Customer Name *</Form.Label>
            <Form.Control id="txtCustomerName" placeholder="Customer Name" />
          </Row>
          <Row className="mb-3">
            <Form.Label>Customer Address *</Form.Label>
            <Form.Control id="txtCustomerAddress" className="mb-1" placeholder="Address" />
            <Form.Control id="txtCustomerAddress2" className="mb-1" placeholder="Address 2" />
            <Form.Control id="txtCustomerAddress3" className="mb-1" placeholder="Address 3" />
          </Row>
          <Row className="mb-3">
            <Form.Label>Pincode</Form.Label>
            <Form.Control id="txtPincode" placeholder="Pincode" />
          </Row>
          <Row className="mb-3">
            <Form.Label>Country *</Form.Label>
            <Form.Select id="txtCountry">
              <option value=''>Select country</option>
              {countryList.map((option, index) => (
                <option key={index} value={option.value}>{option.key}</option>
              ))}
            </Form.Select>
          </Row>

          <Row className="mb-3">
            <Form.Label>State *</Form.Label>
            <Form.Select id="txtState">
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
            <Form.Control id="txtBillingAddress" className="mb-1" placeholder="Billing Address" />
            <Form.Control id="txtBillingAddress2" className="mb-1" placeholder="Billing Address 2" />
            <Form.Control id="txtBillingAddress3" className="mb-1" placeholder="Billing Address 3" />
          </Row>
          <Row className="mb-3">
            <Form.Label>Pincode</Form.Label>
            <Form.Control id="txtBillingPincode" placeholder="Pincode" />
          </Row>
          <Row className="mb-3">
            <Form.Label>Country *</Form.Label>
            <Form.Select id="txtBillingCountry">
              <option value=''>Select country</option>
              {countryList.map((option, index) => (
                <option key={index} value={option.value}>{option.key}</option>
              ))}
            </Form.Select>
          </Row>
          <Row className="mb-3">
            <Form.Label>State *</Form.Label>
            <Form.Select id="txtBillingState">
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
            <Form.Control id="txtPAN" placeholder="PAN No." />
          </Row>
          <Row className="mb-3">
            <Form.Label>GST No *</Form.Label>
            <Form.Control id="txtGST" placeholder="GST No." />
          </Row>
          <Row className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select id="txtStatus">
              <option value=''>Select status</option>
              <option value="Active">Active</option>
              <option value="Expired">Expired</option>
            </Form.Select>
          </Row>
          <Row className="mb-3">
            <Form.Label>User Id</Form.Label>
            <Form.Control id="txtUserId" placeholder="User Id" />
          </Row>
          <Row className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control id="txtPassword" placeholder="Password" />
          </Row>
          <Row className="mb-3">
            <Button variant="primary" type="submit">
              Reset password
            </Button>
          </Row>
        </Col>
      </Row>
    </Form>
  )
}

export default ClientDetails;