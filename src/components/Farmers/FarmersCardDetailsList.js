import React from 'react';
import { Button, Table } from 'react-bootstrap';

export const FarmersCardDetailsList = () => {
  const showAddFarmersCardDetailsForm = () => {
    $('#FarmersCardDetailsForm').show();
    $('#FarmersCardDetailsListCard').hide();
  };
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <Button
          id="btnAddFarmersCardDetailForm"
          onClick={() => showAddFarmersCardDetailsForm()}
          className="mb-2"
        >
          Add Card Details
        </Button>
      </div>

      <Table
        striped
        responsive
        id="FarmersCardDetailsListTable"
        className="no-pb"
      >
        <thead>
          <tr>
            <th>Card Name</th>
            <th>Card Number</th>
            <th>Active Status</th>
            <th>Action</th>
          </tr>
        </thead>
      </Table>
    </>
  );
};

export default FarmersCardDetailsList;
