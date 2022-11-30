import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Form, Row, Col, Button } from 'react-bootstrap';

//Datatable Modules
import FalconComponentCard from 'components/common/FalconComponentCard';

import ClientDetails from '../Clients/ClientDetails';
import ContactDetails from '../Clients/ContactDetails';
import ContactDetailsList from '../Clients/ContactDetailsList';

import TransactionDetails from '../Clients/TransactionDetails';
import TransactionDetailList from '../Clients/TransactionDetailList';

import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTableFooter from 'components/common/advance-table/AdvanceTableFooter';
import AdvanceTableSearchBox from 'components/common/advance-table/AdvanceTableSearchBox';

import $ from 'jquery';

const TabPage = ({ listData, listColumnArray, tabArray, module }) => {

  useEffect(() => {
    $('[data-rr-ui-event-key*="List"]').trigger('click');
    $("#btnNew").show();
    $("#btnSave").hide();
    $("#btnCancel").hide();
  }, []);

  $('[data-rr-ui-event-key*="List"]').click(function () {
    $("#btnNew").show();
    $("#btnSave").hide();
    $("#btnCancel").hide();
    $('#AddClientDetailsForm')[0].reset();
    $('#ContactDetailsTable tbody tr').remove();
    $('#TransactionDetailsTable tbody tr').remove();
  })

  $('[data-rr-ui-event-key*="Customer Details"]').click(function () {
    $("#btnNew").hide();
    $("#btnSave").show();
    $("#btnCancel").show();
    $("#AddContactDetailsForm").hide();
  })

  $('[data-rr-ui-event-key*="Transaction Details"]').click(function () {
    $("#btnNew").hide();
    $("#btnSave").show();
    $("#btnCancel").show();
  })

  $('#btnNew').click(function () {
    $('[data-rr-ui-event-key*="Customer Details"]').trigger('click');
  })

  $('#btnCancel').click(function () {
    $('[data-rr-ui-event-key*="List"]').trigger('click');
  })

  const data = `const columns = ${JSON.stringify(listColumnArray)};
  
  const data = ${JSON.stringify(listData)};`;

  const searchableTableCode = `${data}

  function AdvanceTableExample() {
  
    return (
      <AdvanceTableWrapper
        columns={columns}
        data={data}
        sortable
        pagination
        perPage={5}
      >
        <Row className="flex-end-center mb-3">
          <Col xs="auto" sm={6} lg={4}>
            <AdvanceTableSearchBox table/>
          </Col>
        </Row>
        <AdvanceTable
          table
          headerClassName="bg-200 text-900 text-nowrap align-middle"
          style = "padding-top : 0px"
          rowClassName="align-middle white-space-nowrap"
          tableProps={{
            bordered: true,
            striped: true,
            className: 'fs--1 mb-0 overflow-hidden'
          }}
        />
        <div className="mt-3">
          <AdvanceTableFooter
            rowCount={data.length}
            table
            rowInfo
            navButtons
            rowsPerPageSelection
          />
        </div>
      </AdvanceTableWrapper>
    );
  }
  
  render(<AdvanceTableExample />)`;

  return (
    <>
      <Form>
        <Row>
          <Col>
            <div style={{ display: "flex", justifyContent: "end" }}>
              <Button className='btn btn-primary me-2' id='btnNew'>New</Button>
              <Button className='btn btn-success me-2' id='btnSave'>Save</Button>
              <Button className='btn btn-danger mr-4' id='btnCancel'>Cancel</Button>
            </div>
          </Col>
        </Row>
      </Form>
      <br />
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
                <FalconComponentCard>
                  <FalconComponentCard.Header
                    light={false}
                    className="border-bottom border-200"
                    noPreview={true}
                  />
                  <FalconComponentCard.Body
                    code={searchableTableCode}
                    scope={{
                      AdvanceTableWrapper,
                      AdvanceTable,
                      AdvanceTableFooter,
                      AdvanceTableSearchBox
                    }}
                    language="jsx"
                    noInline
                    noLight
                  />
                </FalconComponentCard>
              )}
              {index == 1 && ClientDetails && (
                <>
                  <FalconComponentCard>
                    <FalconComponentCard.Body language="jsx">
                      <ClientDetails />
                    </FalconComponentCard.Body>
                  </FalconComponentCard>

                  <FalconComponentCard id='AddContactDetailsForm'>
                    <FalconComponentCard.Body language="jsx">
                      <ContactDetails />
                    </FalconComponentCard.Body>
                  </FalconComponentCard>

                  <FalconComponentCard id='ContactDetailsTable'>
                    <FalconComponentCard.Body language="jsx">
                      <ContactDetailsList />
                    </FalconComponentCard.Body>
                  </FalconComponentCard>
                </>
              )}
              {index == 2 && TransactionDetails && (
                <>
                  <FalconComponentCard style={{ display: 'none' }} id='TransactionDetailsTable'>
                    <FalconComponentCard.Body language="jsx">
                      <TransactionDetailList />
                    </FalconComponentCard.Body>
                  </FalconComponentCard>

                  <FalconComponentCard  id='AddTransactionDetailsForm'>
                    <FalconComponentCard.Body language="jsx">
                      <TransactionDetails />
                    </FalconComponentCard.Body>
                  </FalconComponentCard>
                </>
              )}
            </Tab>
          );
        })}
      </Tabs>
    </>
  );
};

export default TabPage;