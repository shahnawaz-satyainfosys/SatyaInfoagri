import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { useEffect } from 'react';

export const BankDetailsList = () => {

  useEffect(() => {
    $('#BankDetailsForm').hide();
  }, []);

  const showAddBankDetailsForm = () => {
    $('#BankDetailsForm').show();
    $('#BankDetailsListCard').hide();
}


  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <Button
          id="btnAddBankDetailsForm"
          onClick={() => showAddBankDetailsForm()}
          className="mb-2"
        >
          Add Bank Details
        </Button>
      </div>

      <Table striped responsive id="BankDetailsListTable" className="no-pb">
        <thead>
          <tr>
            <th>Bank Name</th>
            <th>Bank Address</th>
            <th>Account Number</th>
            <th>Account Type</th>
            <th>IFSC Code</th>
            <th>Active Status</th>
            <th>Action</th>
          </tr>
        </thead>
      </Table>
    </>
  );
};

export default BankDetailsList;
