import React from 'react';
import { Button, Table } from 'react-bootstrap';

export const FarmersMachinaryDetailsList = () => {
    const showAddFarmersMachianryDetailsForm = () => {
        $('#FarmersMachinaryDetailsForm').show();
        $('#FarmersMachinaryDetailsListCard').hide();
    }
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <Button
          id="btnAddFarmersMachinaryDetailsForm"
          onClick={() => showAddFarmersMachianryDetailsForm()}
          className="mb-2"
        >
          Add Live Stock Details
        </Button>
      </div>

      <Table striped responsive id="FarmersMachinaryDetailsListTable" className="no-pb">
        <thead>
          <tr>
            <th>Equipment Category</th>
            <th>Equipment Type</th>
            <th>Quantity</th>
            <th>Active Status</th>
            <th>Action</th>
          </tr>
        </thead>
      </Table>
    </>
  )
}

export default FarmersMachinaryDetailsList