import React from 'react';
import { Button, Table, Form, Col, Row } from 'react-bootstrap';
import { useState } from 'react';

export const FarmersLandTable = () => {
  const [formHasError, setFormError] = useState(false);
  const [rowData, setRowData] = useState([{}]);
  const columnsArray = [
    'Longitude',
    'Latitude',
    'Khashra No',
    'LandMark',
    'Ownership',
    'Usages',
    'Org/Inorg',
    'Cultivated Land',
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
          id="btnAddFarmersLandTable"
          className="mb-2"
          onClick={handleAddRow}
        >
          Add Land Details
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
                  <Form.Control
                    type="text"
                    id="textLongitude"
                    name="longiTude"
                    value={rowData[idx].name}
                    placeholder="Longitude"
                    className="form-control"
                  />
                </td>
                <td key={idx}>
                  <Form.Control
                    type="text"
                    id="textLatitude"
                    name="latiTude"
                    value={rowData[idx].name}
                    placeholder="Latitude"
                    className="form-control"
                  />
                </td>
                <td key={idx}>
                  <Form.Control
                    type="number"
                    id="numKhsraNo"
                    name="khasraNo"
                    min={0}
                    value={rowData[idx].name}
                    placeholder="Khasra No"
                    className="form-control"
                  />
                </td>
                <td key={idx}>
                  <Form.Control
                    type="text"
                    id="txtLandMark"
                    name="landMark"
                    min={0}
                    value={rowData[idx].name}
                    placeholder="Land Mark"
                    className="form-control"
                  />
                </td>

                <td key={idx}>
                  <Form.Select
                    type="text"
                    id="txtOwnerShip"
                    name="ownerShip"
                    className="form-control"
                  >
                    <option value={rowData[idx].name}>Select</option>
                  </Form.Select>
                </td>

                <td key={idx}>
                  <Form.Select
                    type="text"
                    id="txtUsages"
                    name="usages"
                    className="form-control"
                  >
                    <option value={rowData[idx].name}>Select</option>
                  </Form.Select>
                </td>

                <td key={idx}>
                  <Form.Select
                    type="text"
                    id="txtOrgInorg"
                    name="orgInorg"
                    className="form-control"
                  >
                    <option value={rowData[idx].name}>Select</option>
                  </Form.Select>
                </td>

                <td key={idx}>
                  <Form.Control
                    type="text"
                    min={0}
                    id="txtCultivatedLand"
                    name="cultivatedLand"
                    value={rowData[idx].name}
                    placeholder="Cultivated Land"
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

export default FarmersLandTable;
