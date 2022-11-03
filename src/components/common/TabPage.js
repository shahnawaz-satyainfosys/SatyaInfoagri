import React, { useEffect } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
//Datatable Modules
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';

import $ from 'jquery';

const TabPage = ({ listData, listColumnArray, tabArray }) => {
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
            </Tab>
          );
        })}
      </Tabs>
    </>
  );
};

export default TabPage;