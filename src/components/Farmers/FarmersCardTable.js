import React from 'react';
import { Button, Table, Form, Col, Row } from 'react-bootstrap';
import { useState } from 'react';

export const FarmersCardTable = () => {
  const [formHasError, setFormError] = useState(false);
  const [rowData, setRowData] = useState([{}]);
  const columnsArray = ['Card Name', 'Card Number', 'Active Status', '	Action'];

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
        <Button
          id="btnAddFarmersCardTable"
          className="mb-2"
          onClick={handleAddRow}
        >
          Add Card Details
        </Button>
      </div>

      <Form
        noValidate
        validated={formHasError}
        className="details-form"
        id="AddFarmersCardTableDetailsForm"
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
                  <Form.Select
                    type="text"
                    id="txtEquipment"
                    name="equipmentCategory"
                    className="form-control"
                  >
                    <option value={rowData[idx].name}>Select</option>
                  </Form.Select>
                </td>

                <td key={idx}>
                  <Form.Control
                    type="text"
                    id="numFarmersCardNumber"
                    name="farmersCardNumber"
                    value={rowData[idx].name}
                    placeholder="Card Name"
                    min={0}
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
  );
};

export default FarmersCardTable;
