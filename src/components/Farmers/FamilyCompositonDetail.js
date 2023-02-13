import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';

export const FamilyCompositonDetail = () => {
    return (
        <>
            <Form>
                <Row>
                    <Col className="me-1 ms-2">
                        <Row>
                            <Form.Label className='details-form'>Male</Form.Label>
                        </Row>
                        <Row>
                            <Form.Label className='details-form'>Female</Form.Label>
                        </Row>
                        <Row>
                            <Form.Label className='details-form'>Children</Form.Label>
                        </Row>
                    </Col>

                    <Col className="me-3 ms-3">Total
                        <Form.Control type='number' min={0} id="txtTotalMale" name="totalMale" placeholder="0" />
                        <Form.Control type='number' min={0} id="txtTotalFemale" name="totalFemale" placeholder="0" />
                        <Form.Control type='number' min={0} id="txtTotalChildren" name="totalChildren" placeholder="0" />
                    </Col>

                    <Col className="me-3 ms-3">Uneducated
                        <Form.Control type='number' min={0} id="txtUneducatedMale" name="uneducatedMale" placeholder="0" />
                        <Form.Control type='number' min={0} id="txtUneducatedFemale" name="uneducatedFemale" placeholder="0" />
                        <Form.Control type='number' min={0} id="txtUneducatedChildren" name="uneducatedChildren" placeholder="0" />
                    </Col>

                    <Col className="me-3 ms-3">5th Pass
                        <Form.Control type='number' min={0} id="txtPrimaryPassMale" name="primaryPassMale" placeholder="0" />
                        <Form.Control type='number' min={0} id="txtPrimaryPassFemale" name="primaryPassFemale" placeholder="0" />
                        <Form.Control type='number' min={0} id="txtPrimaryPassChildren" name="primaryPassChildren" placeholder="0" />
                    </Col>

                    <Col className="me-3 ms-3">12th Pass
                        <Form.Control type='number' min={0} id="HighSchoolPassMale" name="highSchoolPassMale" placeholder="0" />
                        <Form.Control type='number' min={0} id="HighSchoolPassFemale" name="highSchoolPassFemale" placeholder="0" />
                        <Form.Control type='number' min={0} id="HighSchoolPassChildren" name="highSchoolPassChildren" placeholder="0" />
                    </Col>

                    <Col className="me-3 ms-3">Graduate
                        <Form.Control type='number' min={0} id="GraduateMale" name="graduateMale" placeholder="0" />
                        <Form.Control type='number' min={0} id="GraduateFemale" name="graduateFemale" placeholder="0" />
                        <Form.Control type='number' min={0} id="GraduateChildren" name="graduateChildren" placeholder="0" />
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default FamilyCompositonDetail;