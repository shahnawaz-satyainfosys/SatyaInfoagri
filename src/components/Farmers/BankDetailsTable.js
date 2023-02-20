import React from 'react';
import { Button, Table, Form, Col, Row } from 'react-bootstrap';
import { useState } from 'react';

export const BankDetailsTable = () => {
    const [formHasError, setFormError] = useState(false);
    const [rowData, setRowData] = useState([{}]);
    const columnsArray = [
      'Bank Name',
      'Bank Address',
      'Account Number',
      'Account Type',
      'IFSC Code',
      'Active Status',
      '	Action'
    ];
  
    const handleAddRow = () => {
      const item = {
        name: '',
        mobile: '',
        activeStatus: ''
      };
      setRowData([...rowData, item]);
    };
  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'end' }}>
      <Button id="btnAddBankNameTable" className="mb-2" onClick={handleAddRow}>
        Add Bank Details
      </Button>
    </div>

    <Form
      noValidate
      validated={formHasError}
      className="details-form"
      id="AddFarmersBankTableDetailsForm"
    >
      <Table striped responsive id="TableList" className="no-pb">
        <thead>
          <tr>
            {columnsArray.map((column, index) => (
              <th className="text-left" key={index}>
                {column}
              </th>
            ))}
            <th />
          </tr>
        </thead>
        <tbody id="tbody" className="details-form">
          {rowData.map((item, idx) => (
            <tr key={idx}>
                <td key={idx}>
                <Form.Control
                  type="text"
                  id="txtBankName"
                  name="bankName"
                  value={rowData[idx].name}
                  placeholder="Bank Name"
                  className="form-control"
                />
              </td>
              <td key={idx}>
                <Form.Control
                  type="text"
                  id="txtBankAddress"
                  name="bankAddress"
                  value={rowData[idx].name}
                  placeholder="Bank Address"
                  className="form-control"
                />
              </td>
              
              <td key={idx}>
                <Form.Control
                  type="number"
                  min={0}
                  id="numAccountNumber"
                  name="accountNumber"
                  value={rowData[idx].name}
                  placeholder="Account Number"
                  className="form-control"
                />
              </td>
              <td key={idx}>
                <Form.Select
                  type="text"
                  id="txtAccountType"
                  name="accountType"
                  className="form-control"
                >
                  <option value={rowData[idx].name}>Select</option>
                </Form.Select>
              </td>

              <td key={idx}>
                <Form.Control
                  type="number"
                  id="numIfscCode"
                  name="ifscCode"
                  value={rowData[idx].name}
                  placeholder="IFSC Code"
                  className="form-control"
                />
              </td>

              <td key={idx}>
                <Form.Select
                  id="txtStatus"
                  name="status"
                  className="form-control"
                >
                  <option value={rowData[idx].activeStatus}>Active</option>
                  <option value="Suspended">Suspended</option>
                </Form.Select>
              </td>
              <td>
                <i className="fa fa-pencil me-2" />
                <i className="fa fa-trash" />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Form>
  </>
  )
}

export default BankDetailsTable