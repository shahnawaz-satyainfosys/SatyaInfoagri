import React, { useEffect, useState } from 'react';
import TabPage from 'components/common/TabPage';
import axios from 'axios';

const tabArray = [
  'Customer List',
  "Customer Details",
  "Transaction Details"
];

const listColumnArray = [
  { heading: 'S.No.', property: 'sno' },
  { heading: 'Customer Name', property: 'customerName' },
  { heading: 'User Name', property: 'userName' },
  { heading: 'Address', property: 'address' },
  { heading: 'State', property: 'state' },
  { heading: 'Country', property: 'country' },
  { heading: 'Contact Person', property: 'contactPerson' },
  { heading: 'Contact No', property: 'contactNo' },
  { heading: 'Status', property: 'status' }
];

const detailsForm =
  `<Form>
      <Row>
        <Col className="me-5 ms-3">
          <Row className="mb-3">
            <Form.Label>Customer Name *</Form.Label>
            <Form.Control placeholder="Customer Name" />
          </Row>
          <Row className="mb-3">
            <Form.Label>Customer Address *</Form.Label>
            <Form.Control className="mb-1" placeholder="Address" />
            <Form.Control className="mb-1" placeholder="Address 2" />
            <Form.Control className="mb-1" placeholder="Address 3" />
          </Row>
          <Row className="mb-3">
            <Form.Label>Pincode</Form.Label>
            <Form.Control placeholder="Pincode" />
          </Row>
          <Row className="mb-3">
            <Form.Label>Country *</Form.Label>
            <Form.Select>
              <option value=''>--Select country--</option>
              <option value="India">India</option>
              <option value="Malysia">Malysia</option>
            </Form.Select>
          </Row>
          <Row className="mb-3">
            <Form.Label>State *</Form.Label>
            <Form.Select>
              <option value=''>--Select state--</option>
              <option value="Maharastra">Maharastra</option>
              <option value="Uttarpradesh">Uttar Pradesh</option>
              <option value="Uttarpradesh">Madhya Pradesh</option>
            </Form.Select>
          </Row>
        </Col>
        <Col className="me-5 ms-5">
          <Row className="mb-3">
            <Form.Label>Billing Address *</Form.Label>
            <Form.Control className="mb-1" placeholder="Billing Address" />
            <Form.Control className="mb-1" placeholder="Billing Address 2" />
            <Form.Control className="mb-1" placeholder="Billing Address 3" />
          </Row>
          <Row className="mb-3">
            <Form.Label>Pincode</Form.Label>
            <Form.Control placeholder="Pincode" />
          </Row>
          <Row className="mb-3">
            <Form.Label>Country *</Form.Label>
            <Form.Select>
              <option value=''>--Select country--</option>
              <option value="India">India</option>
              <option value="Malysia">Malysia</option>
            </Form.Select>
          </Row>
          <Row className="mb-3">
            <Form.Label>State *</Form.Label>
            <Form.Select>
              <option value=''>--Select state--</option>
              <option value="Maharastra">Maharastra</option>
              <option value="Uttarpradesh">Uttar Pradesh</option>
              <option value="Uttarpradesh">Madhya Pradesh</option>
            </Form.Select>
          </Row>
        </Col>
        <Col className="me-5 ms-5">
          <Row className="mb-3">
            <Form.Label>PAN No. *</Form.Label>
            <Form.Control placeholder="PAN No." />
          </Row>
          <Row className="mb-3">
            <Form.Label>GST No *</Form.Label>
            <Form.Control placeholder="GST No." />
          </Row>
          <Row className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select>
              <option value=''>--Select status--</option>
              <option value="Active">Active</option>
              <option value="Expired">Expired</option>
            </Form.Select>
          </Row>
          <Row className="mb-3">
            <Form.Label>User Id</Form.Label>
            <Form.Control placeholder="User Id" />
          </Row>
          <Row className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control placeholder="password" />
          </Row>
          <Row className="mb-3">
            <Button variant="primary" type="submit">
              Reset password
            </Button>
          </Row>
        </Col>
      </Row>
    </Form>`;

const Client = () => {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    let token = localStorage.getItem('Token');
    const listFilter = {
      pageNumber: 1,
      pageSize: 2
    };

    axios
      .post(process.env.REACT_APP_API_URL + '/client-list', listFilter,
        { headers: { "Authorization": `Bearer ${JSON.parse(token).value}` } }
      )
      .then(res => {
        if (res.data.status == 200) {
          setListData(res.data.data);
        }
      });
  }, []);

  return (
    <>
      <TabPage
        listData={listData}
        listColumnArray={listColumnArray}
        tabArray={tabArray}
        detailsForm={detailsForm}
      />
    </>
  );
};

export default Client;