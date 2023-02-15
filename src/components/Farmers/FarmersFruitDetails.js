import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

export const FarmersFruitDetails = () => {
  return (
    <>
      <Form className="details-form">
        <Row>
          <Col className="me-3 ms-3">
            <Row className="mb-3">
              <Form.Label>Category Name</Form.Label>
              <Form.Select id="txtCAtegoryName" name="categoryName">
                <option value="select">Select</option>
                <option value="Suspended">Suspended</option>
              </Form.Select>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Label column>Area</Form.Label>
                <Form.Group
                  as={Row}
                  className="mb-2"
                  controlId="formHorizontalEmail"
                >
                  <Col>
                    <Form.Control
                      id="txtArea"
                      name="area"
                      className="mb-1"
                      placeholder="Area"
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      id="txtHA"
                      name="ha"
                      className="mb-1"
                      placeholder="HA"
                      disabled
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Form.Label>Market Location</Form.Label>
              <Form.Control
                id="txtMarketLocation"
                name="marketLocation"
                placeholder="Market Location"
              />
            </Row>
          </Col>

          <Col className="me-3 ms-3">
            <Row className="mb-3">
              <Form.Label>Variety Name</Form.Label>
              <Form.Select id="txtVarietyName" name="varietyName">
                <option value="select">Select</option>
                <option value="select1">Select</option>
              </Form.Select>
            </Row>

            <Row className="mb-3 ">
              <Col>
                <Form.Label>Total Production</Form.Label>
                <Form.Group
                  as={Row}
                  className="mb-2"
                  controlId="formHorizontalEmail"
                >
                  <Col>
                    <Form.Control
                      id="txtTotalProduction"
                      name="totalProduction"
                      className="mb-1"
                      placeholder="Total Production"
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      id="txtProductionFruit"
                      name="productionFruit"
                      className="mb-1"
                      placeholder=""
                      disabled
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            
            <Row className="mb-3">
              <Form.Label>Market Des.</Form.Label>
              <Form.Control
                 as="textarea"
                id="txtMarketDes"
                name="MarketDes"
                placeholder="Market Des"
              />
            </Row>
          </Col>
          
          <Col className="me-3 ms-3">
            <Row className="mb-3 my-4">
              <Form.Control
                type="text"
                id="txtVarietyNameFruit"
                name="varietyNameFruit"
                placeholder=""
                disabled
              />
            </Row>
            <Row>
              <Col>
                <Form.Label column sm={4}>
                  Average Price
                </Form.Label>
                <Form.Group
                  as={Row}
                  className="mb-2"
                  controlId="formHorizontalEmail"
                >
                  <Col>
                    <Form.Control
                      id="txtAveragePrice"
                      name="averagePrice"
                      className="mb-1"
                      placeholder="Average Price"
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      id="txtAveragePrice1"
                      name="averagePrice1"
                      className="mb-1"
                      placeholder=""
                      disabled
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </Col>

          <Col className="me-3 ms-3">
            <Row className="mb-3">
              <Form.Label>Year</Form.Label>
              <Form.Select id="txtYear" name="year">
                <option value="select">Select</option>
                <option value="select1">Select</option>
              </Form.Select>
            </Row>
            <Row className="mb-3">
              <Form.Label>Approval Status</Form.Label>
              <Form.Select id="txtApprovalStatus" name="approvalStatus">
                <option value="select">Select</option>
                <option value="select1">Select</option>
              </Form.Select>
            </Row>
            <Row className="mb-3">
              <Button variant="primary" type="submit">
                Add
              </Button>
            </Row>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default FarmersFruitDetails;
