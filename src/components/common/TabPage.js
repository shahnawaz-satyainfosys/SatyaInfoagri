import React, { useEffect } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
//Datatable Modules
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import FalconComponentCard from 'components/common/FalconComponentCard';
import ClientDetails from '../Clients/ClientDetails';

import $ from 'jquery';

const TabPage = ({ listData, listColumnArray, tabArray, module }) => {

  useEffect(() => {
    setTimeout(function () {
      $('#paginatedTable').DataTable({
        aoColumnDefs: [{ bSortable: false, aTargets: ['_all'] }],
        bLengthChange: true,
        lengthMenu: [
          [10, 50, 100, 250, -1],
          [10, 50, 100, 250, 'All']
        ],
        iDisplayLength: 10
      });
    }, 1000);
    $('[data-rr-ui-event-key*="List"]').trigger('click');
  }, []);

  return (
    <>
      <Tabs
        variant="pills"
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        {Object.values(tabArray).map((tab, index) => {
          return (
            <Tab eventKey={tab} title={tab} className="border p-3">
              {index == 0 && listData && (
                <table
                  id="paginatedTable"
                  style={{ width: 900, float: 'center' }}
                  className="table table-bordered table-stripeds"
                >
                  <thead>
                    <tr>
                      {listColumnArray.map(col => (
                        <th>{col.heading}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {listData.map((object, srno) => (
                      <tr>
                        <td>{++srno}</td>
                        {listColumnArray.filter(column => column.property != 'sno').map(column => (
                          <td>{object[column.property]}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {index == 1 && ClientDetails && (
                <FalconComponentCard>
                  <FalconComponentCard.Body language="jsx">
                    <ClientDetails />
                  </FalconComponentCard.Body>
                </FalconComponentCard>
              )}
            </Tab>
          );
        })}
      </Tabs>
    </>
  );
};

export default TabPage;