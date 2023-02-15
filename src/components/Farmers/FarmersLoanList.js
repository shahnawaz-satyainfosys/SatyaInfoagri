import React from 'react';
import { Button, Table } from 'react-bootstrap';


export const FarmersLoanDetailsList = () => {

    const showAddFarmersLoanDetailsForm = () => {
        $('#FarmersLoanDetailsForm').show();
        $('#FarmersLoanDetailsListCard').hide();
    }
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <Button
          id="btnAddFarmersLoanDetailForm"
          onClick={() => showAddFarmersLoanDetailsForm()}
          className="mb-2"
        >
          Add Loan Details
        </Button>
      </div>

      <Table striped responsive id="FarmersLoanDetailsListTable" className="no-pb">
        <thead>
          <tr>
            <th>Loan Name</th>
            <th>Bank Name</th>
            <th>Branch Name</th>
            <th>Loan Amount</th>
            <th>Active Status</th>
            <th>Action</th>
          </tr>
        </thead>
      </Table>
    </>
  )
}

export default FarmersLoanDetailsList