import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { useEffect } from 'react';


export const FarmersCropDetailsList = () => {

  
  useEffect(() => {
    $('#FarmersCropDetailsForm').hide();
  }, []);

  const showAddFarmersCropDetailsForm = () => {
    $('#FarmersCropDetailsForm').show();
    $('#FarmersCropDetailsListCard').hide();
    
}

     
  return (
    <>
        <div style={{ display: 'flex', justifyContent: 'end' }}>
        <Button
          id="btnAddFarmersCropDetailsForm"
          onClick={() => showAddFarmersCropDetailsForm()}
          className="mb-2"
        >
          Add Crop Details
        </Button>
      </div>

      <Table striped responsive id="FarmersCropsDetailsListTable" className="no-pb">
        <thead>
          <tr>
            <th>Variety Name</th>
            <th>Unit</th>
            <th>S Session</th>
            <th>S Year</th>
            <th>S For Month</th>
            <th>S To Month</th>
            <th>Harvesting Year</th>
            <th>H From Month</th>
            <th>H To Month</th>
            <th>Total Month</th>
            <th>Total Production</th>
            <th>Approval Status</th>
            <th>Action</th>
          </tr>
        </thead>
      </Table>
    </>
  )
}

export default FarmersCropDetailsList