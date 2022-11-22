import React from 'react';
import PropTypes from 'prop-types';
import SimpleBarReact from 'simplebar-react';
import { Table } from 'react-bootstrap';

const AdvanceTable = ({
  getTableProps,
  headers,
  page,
  prepareRow,
  headerClassName,
  rowClassName,
  tableProps
}) => {
  const toTabPage = (rowData) => {  
    $('[data-rr-ui-event-key*="Customer Details"]').trigger('click');
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
  }
  return (
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