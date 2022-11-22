import React, { useEffect, useState } from 'react';
import TabPage from 'components/common/TabPage';
import axios from 'axios';
import ClientDetails from '../Clients/ClientDetails';

const tabArray = ['Customer List', 'Customer Details', 'Transaction Details'];

const listColumnArray = [
  { accessor: 'sl', Header: 'S. No' },
  { accessor: 'customerName', Header: 'Customer Name' },
  { accessor: 'userName', Header: 'User Name' },
  { accessor: 'fullAddress', Header: 'Address' },
  { accessor: 'state', Header: 'State' },
  { accessor: 'country', Header: 'Country' },
  { accessor: 'contactPerson', Header: 'Contact Person' },
  { accessor: 'contactNo', Header: 'Contact No' },
  { accessor: 'status', Header: 'Status' }
];

export const Client = () => {

  localStorage.setItem('EncryptedResponseClientCode', '');

  const [listData, setListData] = useState([]);
  const [perPage, setPerPage] = useState(15);

  const fetchUsers = async (page, size = perPage) => {
    let token = localStorage.getItem('Token');

    const listFilter = {
      pageNumber: page,
      pageSize: size
    };

    const response = await axios
      .post(process.env.REACT_APP_API_URL + '/client-list', listFilter, {
        headers: { Authorization: `Bearer ${JSON.parse(token).value}` }
      })
      .then(res => {
        if (res.data.status == 200) {
          setListData(res.data.data);
        }
      });
  };

  useEffect(() => {
    fetchUsers(1);
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