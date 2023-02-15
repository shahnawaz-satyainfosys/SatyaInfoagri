import React from 'react';
import { Table } from 'react-bootstrap';

const FarmersFruitDetailsList = () => {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'end' }}></div>

      <Table
        striped
        responsive
        id="FarmersCropsDetailsListTable"
        className="no-pb"
      >
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Variety Name</th>
            <th>Unit</th>
            <th>Year</th>
            <th>Area</th>
            <th>Total Production</th>
            <th>Avg Price</th>
            <th>Approval Status</th>
            <th>Action</th>
          
          </tr>
        </thead>
      </Table>
    </>
  );
};

export default FarmersFruitDetailsList;
