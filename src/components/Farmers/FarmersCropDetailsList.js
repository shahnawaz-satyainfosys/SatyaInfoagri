import React from 'react';
import { Table } from 'react-bootstrap';


export const FarmersCropDetailsList = () => {

  
     
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'end' }}>
       
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