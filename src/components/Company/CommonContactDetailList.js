import React, { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { commonContactDetailsAction, commonContactDetailsListAction, commonContactDetailChangedAction } from '../../actions/index';

const CommonContactDetailList = () => {
    const dispatch = useDispatch();
    const [paramsData, setParamsData] = useState({});
    const commonContactDetailListReducer = useSelector((state) => state.rootReducer.commonContactDetailsListReducer)

    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        const count = $('#CommonContactDetailsTable tr').length;
        if (count > 1) {
            $("#CommonContactDetailsTable").show();
        }
    }, []);

    const editCommonContactDetails = (data, contactDetailsToUpdate) => {
        $("#CommonContactDetailsForm").show();
        $("#btnAddCommonContactDetail").hide();
        $("#btnUpdateCommonContactDetail").show();
        $("#CommonContactDetailsTable").hide();
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
        $('#CommonContactDetailsTable').hide();
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