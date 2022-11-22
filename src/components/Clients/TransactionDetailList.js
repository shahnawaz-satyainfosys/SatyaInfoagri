import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Moment from "moment";

const TransactionDetailList = () => {

  const [formData, setFormData] = useState({
    moduleName: '',
    startDate: '',
    endDate: '',
    paymentType: '',    
    gstPercent:'',
    amount: '',
    totalAmount:''
  });

  const [transactionList, setTransactionList] = useState([]);

  useEffect(() => {
    //getTransactionDetailsList();

    const count = $('#TransactionDetailsTable tr').length;
    if (count > 1) {
      $("#TransactionDetailsTable").show();
    }
  }, []);

  const getTransactionDetailsList = async () => {
    const requestParams = {
      EncryptedClientCode: localStorage.getItem("EncryptedResponseClientCode")
    }
    axios
      .post(process.env.REACT_APP_API_URL + '/client-registration-authorization-list', requestParams)
      .then(res => {
        if (res.data.status == 200) {
          let transactionDetailsData = [];
          if (res.data && res.data.data.length > 0)
            transactionDetailsData = res.data.data;
            setTransactionList(transactionDetailsData);
        } else {
          toast.error(res.data.message, {
            theme: 'colored'
          });
        }
      });
  }

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
          {transactionList.map((transaction) => {
            return (
              <tr>
                <td>{transaction.moduleName}</td>
                <td>{Moment(transaction.startDate).format("DD/MM/YYYY")}</td>
                <td>{Moment(transaction.endDate).format("DD/MM/YYYY")}</td>
                <td>{transaction.paymentType}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.gstPercent}</td>
                <td>{transaction.totalAmount}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
};

export default TransactionDetailList;