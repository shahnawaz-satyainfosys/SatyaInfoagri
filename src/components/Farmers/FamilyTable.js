import React from 'react';
import { Button, Table, Form, Col, Row } from 'react-bootstrap';
import { useState } from 'react';

export const FamilyTable = () => {
    const [formHasError, setFormError] = useState(false);
    const [rowData, setRowData] = useState([{}]);
    const columnsArray = [
      'Name',
      'Age',
      'Sex',
      'Relation',
      'Education', 
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
        <Button id="btnAddFarmersFamilyTable" className="mb-2" onClick={handleAddRow}>
          Add Family Details
        </Button>
      </div>

      <Form
        noValidate
        validated={formHasError}
        className="details-form"
        id="AddFarmersFamilyTableDetailsForm"
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
                    id="txtFamilyName"
                    name="familyName"
                    value={rowData[idx].name}
                    placeholder="Name"
                    className="form-control"
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
                    className="form-control"
                  />
                </td>   
                <td key={idx}>
                  <Form.Select
                    type="text"
                    id="txtSex"
                    name="sex"
                    className="form-control"
                  >
                    <option value={rowData[idx].name}>Select</option>
                    <option value={rowData[idx].name}>Male</option>
                    <option value={rowData[idx].name}>Female</option>
                  </Form.Select>
                </td>
                <td key={idx}>
                  <Form.Select
                    type="text"
                    id="txtRelation"
                    name="relation"
                    className="form-control"
                  >
                    <option value={rowData[idx].name}>Select</option>
                  </Form.Select>
                </td>
                <td key={idx}>
                  <Form.Select
                    type="text"
                    id="txtEducation"
                    name="education"
                    className="form-control"
                  >
                    <option value={rowData[idx].name}>Select</option>
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

export default FamilyTable