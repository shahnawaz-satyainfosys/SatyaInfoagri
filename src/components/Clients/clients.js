import React, { useEffect, useState } from 'react';
import TabPage from 'components/common/TabPage';
import axios from 'axios';
import ClientDetails from '../Clients/ClientDetails';

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
        module="Client"
        detailsForm={ClientDetails}
      />
    </>
  );
};

export default Client;