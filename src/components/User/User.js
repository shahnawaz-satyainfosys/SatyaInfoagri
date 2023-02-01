import React, { useState, useEffect } from 'react'
import TabPage from 'components/common/TabPage';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { userDetailsAction, userDetailsErrorAction } from '../../actions/index';
import { toast } from 'react-toastify';
import { Spinner, Modal, Button } from 'react-bootstrap';

const tabArray = ['User List', 'User Detail'];

const listColumnArray = [
    { accessor: 'sl', Header: 'S. No' },
    { accessor: 'clientName', Header: 'Client Name' },
    { accessor: 'loginUserName', Header: 'Username' },
    { accessor: 'loginUserEmailId', Header: 'Email Id' },
    { accessor: 'loginUserMobileNumber', Header: 'Mobile Number' },
    { accessor: 'lastLoginDate', Header: 'Last Login Date' },
    { accessor: 'status', Header: 'Active Status ' }
];

export const User = () => {

    const [listData, setListData] = useState([]);
    const [perPage, setPerPage] = useState(15);
    const [isLoading, setIsLoading] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [formHasError, setFormError] = useState(false);
    const dispatch = useDispatch();

    const fetchUsersList = async (page, size = perPage) => {
        let token = localStorage.getItem('Token');

        const listFilter = {
            pageNumber: page,
            pageSize: size,
        };

        const response =
            setIsLoading(true);
        await axios
            .post(process.env.REACT_APP_API_URL + '/security-user-list', listFilter, {
                headers: { Authorization: `Bearer ${JSON.parse(token).value}` }
            })
            .then(res => {
                setIsLoading(false);
                if (res.data.status == 200) {
                    setListData(res.data.data);
                }
            });
    };

    useEffect(() => {
        fetchUsersList(1);
        $('[data-rr-ui-event-key*="User Detail"]').attr('disabled', true);
    }, []);

    const userDetailsReducer = useSelector((state) => state.rootReducer.userDetailsReducer)
    const userData = userDetailsReducer.userDetails;

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

    $("#UserDetailsForm").trackChanges();

    const clearUserDetailsReducer = () => {
        dispatch(userDetailsAction(undefined));
        dispatch(userDetailsErrorAction(undefined));
        $("#UserDetailsForm").data("changed", false);
    }

    $('[data-rr-ui-event-key*="User Detail"]').click(function () {
        $("#btnNew").hide();
        $("#btnSave").show();
        $("#btnCancel").show();
    })

    const newDetails = () => {
        $('[data-rr-ui-event-key*="User Detail"]').attr('disabled', false);
        $('[data-rr-ui-event-key*="User Detail"]').trigger('click');
        $('#btnSave').attr('disabled', false);
        $("#UserDetailsForm").data("changed", false);
        clearUserDetailsReducer();
    }

    const cancelClick = () => {
        $('#btnExit').attr('isExit', 'false');
        if ($("#UserDetailsForm").isChanged()) {
            setModalShow(true);
        }
        else {
            $('[data-rr-ui-event-key*="User List"]').trigger('click');
        }
    }

    const exitModule = () => {
        $('#btnExit').attr('isExit', 'true');
        if ($("#UserDetailsForm").isChanged()) {
            setModalShow(true);
        }
        else {
            window.location.href = '/dashboard';
        }
    }

    const discardChanges = () => {
        if ($('#btnExit').attr('isExit') == 'true')
            window.location.href = '/dashboard';
        else
            $('[data-rr-ui-event-key*="User List"]').trigger('click');

        setModalShow(false);
    }


    $('[data-rr-ui-event-key*="User List"]').click(function () {
        $('#btnExit').attr('isExit', 'false');
        if ($("#UserDetailsForm").isChanged()) {
            setModalShow(true);
        }

        $("#btnNew").show();
        $("#btnSave").hide();
        $("#btnCancel").hide();
        $('[data-rr-ui-event-key*="User Detail"]').attr('disabled', true);
        $('#UserDetailsForm').get(0).reset();
        clearUserDetailsReducer();
    })

    const userValidation = () => {
        const clientErr = {};
        const loginUserNameErr = {};

        let isValid = true;
        if (!userData.encryptedClientCode) {
            clientErr.empty = "Select client";
            isValid = false;
            setFormError(true);
        }

        if (!userData.loginUserName) {
            loginUserNameErr.userNameEmpty = "Enter username"
            isValid = false;
            setFormError(true);
        }

        if (!isValid) {
            var errorObject = {
                clientErr,
                loginUserNameErr,
            }
            dispatch(userDetailsErrorAction(errorObject))
        }
        return isValid;
    }

    const updateUserCallback = (isAddUser = false) => {

        $("#UserDetailsForm").data("changed", false);
        if(!isAddUser)
        {
            var country = $('#txtCountry').val();
            var state = $('#txtState').val();
        }
        $('#UserDetailsForm').get(0).reset();

        dispatch(userDetailsErrorAction(undefined));

        if (!isAddUser) {
            toast.success("User details updated successfully!", {
                theme: 'colored'
            });

            $('#txtCountry').val(country);
            $('#txtState').val(state);
        }

        $('#btnSave').attr('disabled', true)

        fetchUsersList(1);
    }

    const addUserDetails = () => {
        if (userValidation()) {
            const requestData = {
                encryptedClientCode: userData.encryptedClientCode,
                loginUserEmailId: userData.loginUserEmailId,
                loginUserMobileNumber: userData.loginUserMobileNumber,
                loginUserName: userData.loginUserName,
                activeStatus: userData.status == null || userData.status == "Active" ? "A" : "S",
                addUser: localStorage.getItem("LoginUserName")
            }

            const keys = ['loginUserName', 'addUser']
            for (const key of Object.keys(requestData).filter((key) => keys.includes(key))) {
                requestData[key] = requestData[key] ? requestData[key].toUpperCase() : '';
            }

            setIsLoading(true);
            axios.post(process.env.REACT_APP_API_URL + '/add-user', requestData, {
                headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('Token')).value}` }
            })
                .then(res => {
                    if (res.data.status == 200) {
                        setIsLoading(false);
                        toast.success(res.data.message, {
                            theme: 'colored',
                            autoClose: 10000
                        })
                        updateUserCallback(true);
                        $('[data-rr-ui-event-key*="User List"]').click();
                    } else {
                        setIsLoading(false);
                        toast.error(res.data.message, {
                            theme: 'colored',
                            autoClose: 10000
                        });
                    }
                })
        }
    }

    const updateUserDetails = async () => {
        if (userValidation()) {
            const updatedUserData = {
                encryptedClientCode: userData.encryptedClientCode,
                encryptedSecurityUserId: userData.encryptedSecurityUserId,
                loginUserEmailId: userData.loginUserEmailId,
                loginUserMobileNumber: userData.loginUserMobileNumber,
                loginUserName: userData.loginUserName,
                ActiveStatus: !userData.status || userData.status == "Active" ? "A" : "S",
                ModifyUser: localStorage.getItem("LoginUserName")
            }
            var updateRequired = $("#UserDetailsForm").isChanged();

            if (!updateRequired) {
                toast.warning("Nothing to change!", {
                    theme: 'colored'
                });

                return;
            }

            const keys = ['loginUserName', 'ModifyUser']
            for (const key of Object.keys(updatedUserData).filter((key) => keys.includes(key))) {
                updatedUserData[key] = updatedUserData[key] ? updatedUserData[key].toUpperCase() : '';
            }

            if ($("#UserDetailsForm").isChanged()) {
                setIsLoading(true);
                await axios.post(process.env.REACT_APP_API_URL + '/update-user', updatedUserData, {
                    headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('Token')).value}` }
                })
                    .then(res => {
                        setIsLoading(false);
                        if (res.data.status != 200) {
                            toast.error(res.data.message, {
                                theme: 'colored',
                                autoClose: 10000
                            });
                        } else {
                            updateUserCallback();
                        }
                    })
            }
        }
    }
    return (
        <>
            {isLoading ? (
                <Spinner
                    className="position-absolute start-50 loader-color"
                    animation="border"
                />
            ) : null}

            {modalShow &&
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
                        <h4>Do you want to save changes?</h4>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={!userData.encryptedSecurityUserId ? addUserDetails : updateUserDetails}>Save</Button>
                        <Button variant="danger" onClick={discardChanges}>Discard</Button>
                    </Modal.Footer>
                </Modal>
            }

            <TabPage
                listData={listData}
                tabArray={tabArray}
                listColumnArray={listColumnArray}
                module="User"
                newDetails={newDetails}
                saveDetails={!userData.encryptedSecurityUserId ? addUserDetails : updateUserDetails}
                cancelClick={cancelClick}
                exitModule={exitModule}
            />
        </>
    )
}

export default User;