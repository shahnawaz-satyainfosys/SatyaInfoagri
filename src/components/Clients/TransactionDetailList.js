import React from 'react';
import { useEffect } from 'react';

const TransactionDetailList = () => {

  useEffect(() => {
    const count = $('#TransactionDetailsTable tr').length;
    if (count > 1) {
      $("#TransactionDetailsTable").show();
    }
  }, []);

  return (
    <>     
      <table className='table table-striped' id='TransactionTableDetails'>
        <thead>
          <tr>
            <th>Module Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Payment Type</th>
            <th>Amount</th>
            <th>GST %</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </>
  )
};

export default TransactionDetailList;