import React from 'react';
import { Button, Table } from 'react-bootstrap';
export const FarmersLiveStockList = () => {
    const showAddFarmersLiveStockDetailsForm = () => {
        $('#FarmersLiveStockDetailsForm').show();
        $('#FarmersLiveStockDetailsListCard').hide();
    }
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <Button
          id="btnAddFarmersLiveStockDetailForm"
          onClick={() => showAddFarmersLiveStockDetailsForm()}
          className="mb-2"
        >
          Add Live Stock Details
        </Button>
      </div>

      <Table striped responsive id="FarmersLiveStockDetailsListTable" className="no-pb">
        <thead>
          <tr>
            <th>Cattle Type</th>
            <th>No Of Cattle</th>
            <th>Prodcution</th>
            <th>Rate Per Liter</th>
            <th>Age</th>
            <th>Milk Type</th>
            <th>Active Status</th>
            <th>Action</th>
          </tr>
        </thead>
      </Table>
    </>
  )
}

export default FarmersLiveStockList