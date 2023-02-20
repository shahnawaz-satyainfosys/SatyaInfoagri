import React from 'react';
import { Button, Table, Form, Col, Row } from 'react-bootstrap';
import { useState } from 'react';

 export const FarmersLiveStockTable = () => {
  const [formHasError, setFormError] = useState(false);
  const [rowData, setRowData] = useState([{}]);
  const columnsArray = [
    'Cattle Type',
    'No Of Cattle',
    'Prodcution',
    'Rate Per Liter',
    'Age',
    'Milk Type',
    'Active Status',
    'Action'
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
        <Button
          id="btnAddFarmersLiveStockTable"
          className="mb-2"
          onClick={handleAddRow}
        >
          Add Live Stock Details
        </Button>
      </div>

      <Form
        noValidate
        validated={formHasError}
        className="details-form"
        id="AddFarmersLiveStockTableDetailsForm"
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
                    id="txtcattleType"
                    name="cattleType"
                    className="form-control"
                  >
                    <option value={rowData[idx].name}>Select</option>
                  </Form.Select>
                </td>

                <td key={idx}>
                  <Form.Control
                    type="number"
                    id="numNoOfCattle"
                    name="noOfCattle"
                    value={rowData[idx].name}
                    placeholder="No Of Cattle"
                    className="form-control"
                  />
                </td>

                <td key={idx}>
                  <Form.Control
                    type="number"
                    min={0}
                    id="numProduction"
                    name="production"
                    value={rowData[idx].name}
                    placeholder="Production"
                  />
                </td>
                <td key={idx}>
                  <Form.Control
                    type="number"
                    min={0}
                    id="numRatePerLiter"
                    name="ratePerLiter"
                    value={rowData[idx].name}
                    placeholder="Rate Per Liter"
                  />
                </td>
                <td key={idx}>
                  <Form.Control
                    type="number"
                    min={0}
                    id="numAge"
                    name="age"
                    value={rowData[idx].name}
                    placeholder="Age"
                  />
                </td>
                <td key={idx}>
                  <Form.Select
                    type="text"
                    id="txtMilkType"
                    name="milkType"
                    className="form-control"
                  >
                    <option value={rowData[idx].name}>Select</option>
                  </Form.Select>
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
                  <i className="fa fa-pencil pe-1" />
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

export default FarmersLiveStockTable;
