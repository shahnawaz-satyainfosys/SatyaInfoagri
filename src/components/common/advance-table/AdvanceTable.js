import PropTypes from 'prop-types';
import SimpleBarReact from 'simplebar-react';
import { Table} from 'react-bootstrap';
import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { clientContactDetailsAction } from '../../../actions/index';
import { transactionDetailsAction } from '../../../actions/index';
import { clientDetailsAction } from '../../../actions/index';

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
    dispatch(clientDetailsAction(rowData));
    $('[data-rr-ui-event-key*="Customer Details"]').trigger('click');
    localStorage.setItem('EncryptedResponseClientCode', rowData.encryptedClientCode);
    $("#AddContactDetailsForm").hide();
    getContactDetailsList(rowData.encryptedClientCode);
    getTransactionDetailsList(rowData.encryptedClientCode);
  }

  const getContactDetailsList = async (encryptedClientCode) => {

    const requestParams = {
      EncryptedClientCode: encryptedClientCode
    }

    axios
      .post(process.env.REACT_APP_API_URL + '/get-client-contact-detail-list', requestParams)
      .then(res => {

        if (res.data.status == 200) {
          let contactDetailsData = [];
          if ($('#ContactDetailsTable tbody tr').length > 1) {
            $('#ContactDetailsTable tbody tr').remove();
          }

          contactDetailsData = res.data.data;
          dispatch(clientContactDetailsAction(contactDetailsData));

          if (res.data && res.data.data.length > 0) {
            $("#ClientContactDetailsTable").show();
          } else {
            $("#ClientContactDetailsTable").hide();
          }
        }
        else {
          $("#ClientContactDetailsTable").hide();
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

        if ($('#TransactionDetailsTable tbody tr').length > 1) {
          $('#TransactionDetailsTable tbody tr').remove();
        }

        let transactionDetailsData = [];
        transactionDetailsData = res.data.data;
        dispatch(transactionDetailsAction(transactionDetailsData));

        if (res.data.status == 200) {        
          if (res.data && res.data.data.length > 0) {
            $('#TransactionDetailsTable').show();
          } else {
            $('#TransactionDetailsTable').hide();
          }
        }
        else {
          $("#TransactionDetailsTable").hide();
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
                <tr key={i} className={rowClassName} {...row.getRowProps()} onDoubleClick={() => toTabPage(row.original)}>
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