import React, { useEffect } from 'react';
import { Tabs, Tab, Form, Row, Col, Button, Modal } from 'react-bootstrap';

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

import { useDispatch } from 'react-redux';
import { clientDetailsAction, clientContactDetailsAction, transactionDetailsAction } from '../../actions/index';

import $ from 'jquery';

const TabPage = ({ listData, listColumnArray, tabArray, module, saveDetails }) => {

  const dispatch = useDispatch();

  $.fn.extend({
    trackChanges: function () {
      $(":input", this).change(function () {
        $(this.form).data("changed", true);
      });
    }
    ,
    isChanged: function () {
      return this.data("changed");
    }
  });

  $("#AddClientDetailsForm").trackChanges();

  useEffect(() => {
    $('[data-rr-ui-event-key*="List"]').trigger('click');
    $('[data-rr-ui-event-key*="Details"]').attr('disabled', true);
    $("#btnNew").show();
    $("#btnSave").hide();
    $("#btnCancel").hide();
  }, []);

  const clearClientReducers = () => {
    dispatch(clientDetailsAction([]));
    dispatch(clientContactDetailsAction([]));
    dispatch(transactionDetailsAction([]));
  }

  $('[data-rr-ui-event-key*="List"]').click(function () {
    $("#btnNew").show();
    $("#btnSave").hide();
    $("#btnCancel").hide();

    clearClientReducers();
  })

  $('[data-rr-ui-event-key*="Customer Details"]').click(function () {
    $("#btnNew").hide();
    $("#btnSave").show();
    $("#btnCancel").show();
    $("#AddContactDetailsForm").hide();
    $("#btnUpdateClientDetail").hide();
  })

  $('[data-rr-ui-event-key*="Transaction Details"]').click(function () {
    $("#btnNew").hide();
    $("#btnSave").show();
    $("#btnCancel").show();
  })

  $('#btnNew').click(function () {
    $('[data-rr-ui-event-key*="Details"]').attr('disabled', false);
    $('[data-rr-ui-event-key*="List"]').attr('disabled', true);
    $('[data-rr-ui-event-key*="Customer Details"]').trigger('click');

    clearClientReducers();
  })

  $('#btnSave').click(function () {
    saveDetails();
  })

  $('#btnCancel').click(function () {
    if ($("#AddClientDetailsForm").isChanged()) {
      setModalShow(true);
    } else {
      window.location.reload();
    }

    // window.location.reload();
    // $('[data-rr-ui-event-key*="Details"]').attr('disabled', true);
    // $('[data-rr-ui-event-key*="List"]').attr('disabled', false);
    // $('[data-rr-ui-event-key*="List"]').trigger('click');
  })

  $('#btnExit').click(function () {
    if ($("#AddClientDetailsForm").isChanged()) {
      setModalShow(true);
    } else {
      window.location.href = '/dashboard';
    }
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

  const [modalShow, setModalShow] = React.useState(false);

  const save = () => {
    saveDetails();
    setModalShow(false);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  const exitSave = () => {
    saveDetails();
    setModalShow(false);
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 2000);
  }

  return (
    <>
      {modalShow &&
        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          backdrop="static"
        >
          <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Confirmation</Modal.Title>
        </Modal.Header>
          <Modal.Body>
            <h4>Save changes?</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={() => { save() }}>Save</Button>
            <Button variant="danger" onClick={() => window.location.reload()}>Discard</Button>
          </Modal.Footer>
        </Modal>
      }
      <Form>
        <Row>
          <Col>
            <div style={{ display: "flex", justifyContent: "end" }}>
              <Button className='btn btn-primary me-2' id='btnNew'>New</Button>
              <Button className='btn btn-success me-2' id='btnSave'>Save</Button>
              <Button className='btn btn-danger me-2' id='btnCancel' >Cancel</Button>
              <Button className='btn btn-info mr-4' id='btnExit'>Exit</Button>
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
              {index == 1 && module == "Client" && ClientDetails && (
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
              {index == 2 && module == "Client" && TransactionDetails && (
                <>
                  <FalconComponentCard id='TransactionDetailsListCard'>
                    <FalconComponentCard.Body language="jsx">
                      <TransactionDetailList />
                    </FalconComponentCard.Body>
                  </FalconComponentCard>

                  <FalconComponentCard id='AddTransactionDetailsForm'>
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