import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { useEffect } from 'react';

const FarmersIrrigrationList = () => {
    useEffect(() => {
        $('#FarmersIrrigrationDetailsForm').hide();
      }, []);

      const showAddFarmersIrrigrationsDetailsForm = () => {
        $('#FarmersIrrigrationDetailsForm').show();
        $('#FarmersIrrigrationDetailsListCard').hide();
    }

  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'end' }}>
      <Button
        id="btnAddFarmersIrrigrationDetailsForm"
        onClick={() => showAddFarmersIrrigrationsDetailsForm()}
        className="mb-2"
      >
        Add Irrigrations Details
      </Button>
    </div>

    <Table striped responsive id="FarmersIrrigrationsDetailsListTable" className="no-pb">
      <thead>
        <tr>
          <th>Irrigration Detail</th>
          <th>Source Of Water</th>
          <th>Active Status</th>
          <th>Action</th>
        </tr>
      </thead>
    </Table>
  </>
  )
}

export default FarmersIrrigrationList