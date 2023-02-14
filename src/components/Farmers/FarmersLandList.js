import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { useEffect } from 'react';

export const FarmersLandListCard = () => {
  useEffect(() => {
    $('#FarmersLandDetailsForm').hide();
  }, []);
  const showAddFarmersLandDetailsForm = () => {
    $('#FarmersLandDetailsForm').show();
    $('#FarmersLandDetailsListCard').hide();
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <Button
          id="btnAddFarmersLandDetailForm"
          onClick={() => showAddFarmersLandDetailsForm()}
          className="mb-2"
        >
          Add Land Details
        </Button>
      </div>

      <Table striped responsive id="FarmersLandListTable" className="no-pb">
        <thead>
          <tr>
            <th>Longitude</th>
            <th>Latitude</th>
            <th>Khashra No</th>
            <th>LandMark</th>
            <th>Ownership</th>
            <th>Usages</th>
            <th>Org/Inorg</th>
            <th>Cultivated Land</th>
            <th>Active Status</th>
            <th>Action</th>
          </tr>
        </thead>
      </Table>
    </>
  );
};

export default FarmersLandListCard;
