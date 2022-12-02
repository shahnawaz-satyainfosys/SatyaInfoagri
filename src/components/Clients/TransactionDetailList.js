import React from 'react';
import { useEffect } from 'react';
import {useSelector} from 'react-redux';
import Moment from "moment";

const TransactionDetailList = () => {
  const transactionDetailReducer = useSelector((state) => state.rootReducer.transactionDetailsReducer)

  useEffect(() => {
    const count = $('#TransactionDetailsTable tr').length;
    if (count > 1) {
      $("#TransactionDetailsTable").show();
    }else{
      $("#TransactionDetailsTable").hide();
    }
  }, []);

  return (
    <>     
       <table className='table table-striped'>
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
          {transactionDetailReducer &&
           transactionDetailReducer.transactionDetails && 
           transactionDetailReducer.transactionDetails.length > 0 &&
           transactionDetailReducer.transactionDetails.map(data => 
            (data &&
            <tr>
              <td>{data.moduleName}</td>
              <td>{Moment(data.startDate).format("DD/MM/YYYY")}</td>
              <td>{Moment(data.endDate).format("DD/MM/YYYY")}</td>
              <td>{data.paymentMode === "CQ" ? "Cheque" : data.paymentType == "CS" ? "Cash" : "TT"}</td>
              <td>{data.amount}</td>
              <td>{data.gstPercent}%</td>
              <td>{data.totalAmount}</td>
            </tr>))}
        </tbody>
      </table>
    </>
  )
};

export default TransactionDetailList;