import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Button, Modal, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { commonContactDetailsAction, commonContactDetailsListAction, commonContactDetailChangedAction } from '../../actions/index';

const CommonContactDetailList = () => {
    const dispatch = useDispatch();
    const [paramsData, setParamsData] = useState({});
    const commonContactDetailListReducer = useSelector((state) => state.rootReducer.commonContactDetailsListReducer)

    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        const count = $('#CommonContactDetailsCard tr').length;
        if (count > 1) {
            $("#CommonContactDetailsCard").show();
        }
    }, []);

    const editCommonContactDetails = (data, contactDetailsToUpdate) => {
        $("#CommonContactDetailsForm").show();
        $("#btnAddCommonContactDetail").hide();
        $("#btnUpdateCommonContactDetail").show();
        $("#CommonContactDetailsCard").hide();
        localStorage.setItem("contactPersonDetailsToUpdate", contactDetailsToUpdate);
        dispatch(commonContactDetailsAction(data));
    }

    const ModalPreview = (encryptedCommonContactDetailsId, contactDetailsToDelete) => {
        setModalShow(true);
        setParamsData({ encryptedCommonContactDetailsId, contactDetailsToDelete });
    }

    const deleteCommonContactDetails = () => {

        if (!paramsData)
            return false;

        var objectIndex = commonContactDetailListReducer.commonContactDetailsList.findIndex(x => x.contactDetails == paramsData.contactDetailsToDelete);
        commonContactDetailListReducer.commonContactDetailsList.splice(objectIndex, 1)

        var deleteCommonContactDetailId = localStorage.getItem("DeleteCommonContactDetailsId");

        var deleteCommonContactDetail = deleteCommonContactDetailId ? deleteCommonContactDetailId + "," + paramsData.encryptedCommonContactDetailsId : paramsData.encryptedCommonContactDetailsId;

        localStorage.setItem("DeleteCommonContactDetailsId", deleteCommonContactDetail);

        dispatch(commonContactDetailsListAction(commonContactDetailListReducer.commonContactDetailsList));

        if ($("#btnSave").attr('disabled'))
            $("#btnSave").attr('disabled', false);

        toast.success("Common contact deleted successfully", {
            theme: 'colored'
        });

        setModalShow(false);

        const commoncontactDetailDeleted = {
            commonContactDetailsChanged: true
        }

        dispatch(commonContactDetailChangedAction(commoncontactDetailDeleted));
    }

    const showAddCommonContactDetailsForm = () => {
        $("#CommonContactDetailsForm").show();
        $("#btnAddCommonContactDetail").show();
        $("#btnUpdateCommonContactDetail").hide();
        $('#CommonContactDetailsCard').hide();
    }

    const setContactDetailData = (contactObj) => {
        var contactListData = [];
        for (let i = 0; i < contactObj.length; i++) {
            let contactDetailsData = {
                encryptedClientCode: contactObj[i].encryptedClientCode,
                contactPerson: contactObj[i].contactPerson ? contactObj[i].contactPerson : '',
                contactType: contactObj[i].contactType ? contactObj[i].contactType : 'PRE',
                contactDetails: contactObj[i].emailId ? contactObj[i].emailId : contactObj[i].mobileNo,
                flag: contactObj[i].sendMail == 'Y' ? '1' : '0'
            };

            contactListData.push(contactDetailsData);
        }
        dispatch(commonContactDetailsListAction(contactListData));
    }

    const onCheckChanged = () => {
        const request = {
            EncryptedClientCode: localStorage.getItem("EncryptedClientCode")
        }

        if ($('#contactListChkBox').is(":checked")) {
            if (commonContactDetailListReducer.commonContactDetailsList.length > 0){
                setContactDetailData(commonContactDetailListReducer.commonContactDetailsList)
            }
            else{
                axios
                .post(process.env.REACT_APP_API_URL + '/get-client-contact-detail-list', request)
                .then(res => {

                    if (res.data.status == 200) {
                        if (res.data && res.data.data.length > 0) {
                            $("#CompanyContactDetailsTable").show();
                        } else {
                            $("#CompanyContactDetailsTable").hide();
                        }
                        setContactDetailData(res.data.data)            
                    }
                    else {
                        $("#CompanyContactDetailsTable").hide();
                    }
                });
            }
        }
        else {
            $("#CompanyContactDetailsTable").hide();
        }
    }

    return (
        <>
            {modalShow && paramsData &&
                <Modal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    backdrop="static"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Are you sure, you want to delete this contact detail?</h4>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={() => setModalShow(false)}>Cancel</Button>
                        <Button variant="danger" onClick={() => deleteCommonContactDetails()}>Delete</Button>
                    </Modal.Footer>
                </Modal>
            }

            <div>
                <Row className="justify-content-between align-items-center">
                    <Col xs="auto">
                        <Form.Check type="checkbox" id="contactListChkBox" className="mb-0">
                            <Form.Check.Input
                                type="checkbox"
                                name="Same as client"
                                onChange={onCheckChanged}
                            />
                            <Form.Check.Label className="mb-0 text-700">
                                Same as client
                            </Form.Check.Label>
                        </Form.Check>
                    </Col>
                </Row>
                <div style={{ display: "flex", justifyContent: "end" }}>
                    <Button id='btnAddCommonContact' onClick={() => showAddCommonContactDetailsForm()}>
                        Add Common Contact Detail
                    </Button>
                </div>
                {commonContactDetailListReducer &&
                    commonContactDetailListReducer.commonContactDetailsList &&
                    commonContactDetailListReducer.commonContactDetailsList.length > 0 && (
                        <Table striped responsive id="CompanyContactDetailsTable">
                            <thead>
                                <tr>
                                    <th>Contact Person</th>
                                    <th>Contact Type</th>
                                    <th>Contact Details</th>
                                    <th>Send Mail</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody id='tableCommonContactPerson'>

                                {commonContactDetailListReducer.commonContactDetailsList.length > 0 ?

                                    commonContactDetailListReducer.commonContactDetailsList.map((data, index) =>
                                    (data &&
                                        <tr>
                                            <td>{data.contactPerson}</td>
                                            <td>{data.contactType == "OFE" ? "Office Email Id" :
                                                data.contactType == "OFM" ? "Office Mobile No" :
                                                    data.contactType == "OFL" ? "Office Land Line No" :
                                                        data.contactType == "OFX" ? "Office Ext No" :
                                                            data.contactType == "OFF" ? "Office Fax No" :
                                                                data.contactType == "PPP" ? "PP No" :
                                                                    data.contactType == "PMN" ? "Personal Mobile No" :
                                                                        data.contactType == "PRL" ? "Land Line No" :
                                                                            data.contactType == "PRS" ? "Spouse Mob No" : "Personal Mail"}</td>
                                            <td>{data.contactDetails}</td>
                                            <td>{data.flag == '1' ? "Yes" : "No"}</td>
                                            <td><i className="fa fa-pencil me-2" onClick={() => { editCommonContactDetails(data, data.contactDetails) }} />
                                                <i className="fa fa-trash" onClick={() => { ModalPreview(data.encryptedCommonContactDetailsId, data.contactDetails) }} /></td>
                                        </tr>)
                                    )
                                    : null}
                            </tbody>
                        </Table>)}
            </div>
        </>
    )
}
















export default CommonContactDetailList;