import PropTypes from 'prop-types';
import SimpleBarReact from 'simplebar-react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';
import Moment from "moment";
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { clientContactDetailsAction } from '../../../actions/index';

const AdvanceTable = ({
  getTableProps,
  headers,
  page,
  prepareRow,
  headerClassName,
  rowClassName,
  tableProps
}) => {

  const dispatch = useDispatch();

  const toTabPage = (rowData) => {
    $('[data-rr-ui-event-key*="Customer Details"]').trigger('click');
    $('#addClient').hide();
    $('#addContactDetail').hide();
    $('#updateContactDetail').show();
    localStorage.setItem('EncryptedResponseClientCode', rowData.original.encryptedClientCode);
    $("#txtCustomerName").val(rowData.original.customerName);
    $("#txtCustomerAddress").val(rowData.original.address1);
    $("#txtCustomerAddress2").val(rowData.original.address2);
    $("#txtCustomerAddress3").val(rowData.original.address3);
    $("#txtPincode").val(rowData.original.pinCode);
    $("#txtCountry").find(':rowData.original.country').val(rowData.original.encryptedCountryCode);
    $("#txtState").val(rowData.original.state);
    $("#txtBillingAddress").val(rowData.original.billingAddress1);
    $("#txtBillingAddress2").val(rowData.original.billingAddress2);
    $("#txtBillingAddress3").val(rowData.original.billingAddress3);
    $("#txtBillingPincode").val(rowData.original.billingPinCode);
    $("#txtBillingCountry").val(rowData.original.billingCountry);
    $("#txtBillingState").val(rowData.original.billingState);
    $("#txtPAN").val(rowData.original.panNumber);
    $("#txtGST").val(rowData.original.gstNumber);
    $("#txtStatus").val(rowData.original.status);
    $("#numNoOfCompanies").val(rowData.original.noOfComapnies);
    $("#numNoOfUsers").val(rowData.original.noOfUsers);
    getContactDetailsList(rowData.original.encryptedClientCode);
    getTransactionDetailsList(rowData.original.encryptedClientCode);
  }

  // function deleteModal() {
  //   const [modalShow, setModalShow] = React.useState(false);
  //   return (
  //     <Modal
  //       show={modalShow}
  //       onHide={() => setModalShow(false)}
  //       size="lg"
  //       aria-labelledby="contained-modal-title-vcenter"
  //       centered
  //     >
  //       <Modal.Header closeButton>
  //         <Modal.Title id="contained-modal-title-vcenter">Delete contact detail</Modal.Title>
  //       </Modal.Header>
  //       <Modal.Body>
  //         <p>
  //           Are you sure you want to delete this contact detail.
  //         </p>
  //       </Modal.Body>
  //       <Modal.Footer>
  //         <Button onClick={() => deleteContactDetails}>Delete</Button>
  //         <Button onClick={() => setModalShow(false)}>Cancel</Button>
  //       </Modal.Footer>
  //     </Modal>
  //   );
  // }

  // useEffect(() => {
  //   const data = { "encryptedClientContactDetailsId": "CfDJ8E1VfBCbVHNLmqjO89Q1MV0Kajm9UyarTuAMbhJnM2gHDnSoCZN58sOD_LhO_A0oZiJD0IBrTSWQ-sfWBMiF6P0ik23-0eCi2Xfbwm2uNxB86e0vO6oU6KmXzh_DsisQTQ" };
  //   axios
  //     .delete(process.env.REACT_APP_API_URL + '/delete-client-contact-detail', {data})
  //     .then(res => {
  //       if (res.data.status == 200) {
  //         toast.success(res.data.message, {
  //           theme: 'colored'
  //         });
  //       }
  //       else {
  //         toast.error(res.data.message, {
  //           theme: 'colored'
  //         });
  //       }
  //     })
  // });

  // const deleteContactDetails = (encryptedClientContactDetailsId) => {
  //   const deleteRequest = {
  //     EncryptedClientContactDetailsId: encryptedClientContactDetailsId
  //   }

  //   axios
  //     .delete(process.env.REACT_APP_API_URL + '/delete-client-contact-detail', deleteRequest)
  //     .then(res => {
  //       if (res.data.status == 200) {
  //         toast.success(res.data.message, {
  //           theme: 'colored'
  //         });
  //       }
  //       else {
  //         toast.error(res.data.message, {
  //           theme: 'colored'
  //         });
  //       }
  //     })
  // }

  const getContactDetailsList = async (encryptedClientCode) => {

    const requestParams = {
      EncryptedClientCode: encryptedClientCode
    }

    axios
      .post(process.env.REACT_APP_API_URL + '/get-client-contact-detail-list', requestParams)
      .then(res => {
        
        if (res.data.status == 200) {
          let contactDetailsData = [];
          if (res.data && res.data.data.length > 0) {
            if ($('#ContactDetailsTable tbody tr').length > 1) {
              $('#ContactDetailsTable tbody tr').remove();
            }
            $("#ContactDetailsTable").show();
            contactDetailsData = res.data.data;

            dispatch(clientContactDetailsAction(contactDetailsData));

            // $(function () {
            //   $.each(contactDetailsData, function (c, contactDetails) {
            //     var tr = $('<tr>').append(
            //       $('<td>').text(contactDetails.contactPerson),
            //       $('<td>').text(contactDetails.mobileNo),
            //       $('<td>').text(contactDetails.emailId),
            //       $('<td>').text(contactDetails.designation),
            //       $('<td>').text(contactDetails.sendMail == 'Y' ? "Yes" : "No"),
            //       $('<td>').html('<i class="fa fa-pencil me-2"/> <i class="fa fa-trash" onclick="" />')
            //     ).appendTo('#ClientContactDetailsTable');
            //     $('#txtContactPerson').val(contactDetails.contactPerson);
            //     $('#txtMobileno').val(contactDetails.mobileNo);
            //     $('#txtEmailId').val(contactDetails.emailId);
            //     $('#txtDesignation').val(contactDetails.designation);
            //     $('#txtSendMail').val(contactDetails.sendMail);
            //     localStorage.setItem('EncryptedContactId', contactDetails.encryptedClientContactDetailsId)
            //   });
            // });
          }
        } else {
          toast.error(res.data.message, {
            theme: 'colored'
          });
        }
      });
  }

  const getTransactionDetailsList = async (encryptedClientCode) => {
    const requestParams = {
      EncryptedClientCode: encryptedClientCode
    }

    axios
      .post(process.env.REACT_APP_API_URL + '/client-registration-authorization-list', requestParams)
      .then(res => {
        if (res.data.status == 200) {
          if (res.data && res.data.data.length > 0) {
            if ($('#TransactionTableDetails tbody tr').length > 1) {
              $('#TransactionTableDetails tbody tr').remove();
            }

            $("#TransactionDetailsTable").show();

            $(function () {
              $.each(res.data.data, function (t, transactionDetails) {
                var tr = $('<tr>').append(
                  $('<td>').text(transactionDetails.moduleName),
                  $('<td>').text(Moment(transactionDetails.startDate).format("DD/MM/YYYY")),
                  $('<td>').text(Moment(transactionDetails.endDate).format("DD/MM/YYYY")),
                  $('<td>').text(transactionDetails.paymentType == "CQ" ? "Cheque" : transactionDetails.paymentType == "CS" ? "Cash" : "TT"),
                  $('<td>').text(transactionDetails.amount),
                  $('<td>').text(transactionDetails.gstPercent),
                  $('<td>').text(transactionDetails.totalAmount)
                ).appendTo('#TransactionTableDetails');
              });
            });
          }
        }
      });
  }

  return (
    <>
      <SimpleBarReact>
        <Table {...getTableProps(tableProps)}>
          <thead className={headerClassName}>
            <tr>
              {headers.map((column, index) => (
                <th
                  key={index}
                  {...column.getHeaderProps(
                    column.getSortByToggleProps(column.headerProps)
                  )}
                >
                  {column.render('Header')}
                  {column.canSort ? (
                    column.isSorted ? (
                      column.isSortedDesc ? (
                        <span className="sort desc" />
                      ) : (
                        <span className="sort asc" />
                      )
                    ) : (
                      <span className="sort" />
                    )
                  ) : (
                    ''
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr key={i} className={rowClassName} {...row.getRowProps()} onDoubleClick={() => toTabPage(row)}>
                  {row.cells.map((cell, index) => {
                    return (
                      <td
                        key={index}
                        {...cell.getCellProps(cell.column.cellProps)}
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </SimpleBarReact>
    </>
  );
};
AdvanceTable.propTypes = {
  getTableProps: PropTypes.func,
  headers: PropTypes.array,
  page: PropTypes.array,
  prepareRow: PropTypes.func,
  headerClassName: PropTypes.string,
  rowClassName: PropTypes.string,
  tableProps: PropTypes.object
};

export default AdvanceTable;