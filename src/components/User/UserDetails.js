import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Col, Form, Row } from 'react-bootstrap';


export const UserDetails = () => {
    const dispatch = useDispatch();

    const resetUserDetail = () => {
        dispatch(userDetailsAction({
            "loginUserName": "",
            "loginUserEmailId": "",
            "loginUserMobileNumber": "",
            "loginPassword": "",
            "status": "Active"
        }))
    }

    const [formHasError, setFormError] = useState(false);

    return (
        <>
            <Form noValidate validated={formHasError} className="details-form" id='UserDetailsForm'>
                <Row>
                    <Col className="me-3 ms-3">
                        <Row className="mb-3">
                            <Form.Label>Username<span className="text-danger">*</span></Form.Label>
                            <Form.Control id="txtUserName" name="loginUserName" maxLength={20} placeholder="Enter Username" required />
                        </Row>
                        <Row className="mb-3">
                            <Form.Label>Email<span className="text-danger">*</span></Form.Label>
                            <Form.Control id="txtEmail" name="loginUserEmailId" maxLength={50} className="mb-1" placeholder="Enter email" />
                        </Row>
                        <Row className="mb-3">
                            <Form.Label>Mobile Number<span className="text-danger">*</span></Form.Label>
                            <Form.Control id="txtMobile" name="loginUserMobileNumber" maxLength={10} className="mb-1" placeholder="Enter mobile number" />
                        </Row>
                    </Col>
                    <Col className="me-3 ms-3">
                        <Row className="mb-3">
                            <Form.Label>Password<span className="text-danger">*</span></Form.Label>
                            <Form.Control id="txtPassword" name="loginPassword" maxLength={20} className="mb-1" placeholder="Enter password" />
                        </Row>
                        <Row className="mb-3">
                            <Form.Label>Confirm Password<span className="text-danger">*</span></Form.Label>
                            <Form.Control id="txtConfirmPassword" name="loginConfirmPassword" maxLength={20} className="mb-1" placeholder="Enter confirm password" />
                        </Row>
                        <Row className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select id="txtStatus" name="status" >
                                <option value="Active">Active</option>
                                <option value="Suspended">Suspended</option>
                            </Form.Select>
                        </Row>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default UserDetails