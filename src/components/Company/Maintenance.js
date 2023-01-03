import React, { useState, useEffect } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import { companyDetailsAction, clientDataAction } from 'actions';
import { useDispatch, useSelector } from 'react-redux';
import Moment from "moment";

export const Maintenance = () => {

    const dispatch = useDispatch();

    const resetCompanyData = () => {
        dispatch(companyDetailsAction({
            "companyName": "",
            "companyShortName": "",
            "companyType": "",
            "address1": "",
            "address2": "",
            "address3": "",
            "companyRegDate": "",
            "companyRegNo": "",
            "companySalesTax": "",
            "companyTinNo": "",
            "companyPan": "",
            "companyGstNo": "",
            "companyLutNo": "",
            "companyExpImp": "",
            "companyLogo": "",
            "pinCode": "",
            "state": "",
            "country": "",
            "encryptedCompanyCode": "",
            "encryptedCountryCode": "",
            "encryptedStateCode": "",
            "state": "",
            "status": "Active"
        }))
    }

    const companyDetailsReducer = useSelector((state) => state.rootReducer.companyDetailsReducer)
    var companyData = companyDetailsReducer.companyDetails;

    const clientDataReducer = useSelector((state) => state.rootReducer.clientDataReducer)
    var clientCompanyData = clientDataReducer.clientData;

    if (!companyDetailsReducer.companyDetails ||
        companyDetailsReducer.companyDetails.length <= 0) {
        resetCompanyData();
    }

    const companyDetailsErrorReducer = useSelector((state) => state.rootReducer.companyDetailsErrorReducer)
    const companyError = companyDetailsErrorReducer.companyDetailsError;

    const [countryList, setCountryList] = useState([]);
    const [stateList, setStateList] = useState([]);

    const [formHasError, setFormError] = useState(false);

    useEffect(() => {
        getCountries();
    }, []);

    const getCountries = async () => {
        axios
            .get(process.env.REACT_APP_API_URL + '/country-list')
            .then(res => {
                if (res.data.status == 200) {
                    let countryData = [];
                    if (res.data && res.data.data.length > 0)
                        res.data.data.forEach(country => {
                            countryData.push({
                                key: country.countryName,
                                value: country.encryptedCountryCode
                            });
                        });
                    setCountryList(countryData);
                }
            });
    }

    const getStates = async (EncryptedCountryCode) => {
        const userData = {
            EncryptedCountryCode: EncryptedCountryCode
        }

        axios
            .post(process.env.REACT_APP_API_URL + '/state-list', userData)
            .then(res => {

                let stateData = [];

                if (res.data.status == 200) {
                    if (res.data && res.data.data.length > 0) {
                        res.data.data.forEach(state => {
                            stateData.push({
                                key: state.stateName,
                                value: state.encryptedStateCode
                            });
                        });
                    }
                }
                setStateList(stateData);
            });
    }

    const setSelectCountryStates = () => {
        $('#txtCountry option:contains(' + companyData.country + ')').prop('selected', true)
        getStates(companyData.encryptedCountryCode);
        $('#txtState option:contains(' + companyData.state + ')').prop('selected', true)
    }

    if (companyData.country &&
        (!$('#txtCountry').val() ||
            !$('#txtState').val())) {
        setSelectCountryStates();
    }

    if (companyData.status && $('#txtStatus').val()) {
        $('#txtStatus option:contains(' + companyData.status + ')').prop('selected', true);
    }

    const handleFieldChange = e => {
        dispatch(companyDetailsAction({
            ...companyData,
            [e.target.name]: e.target.value
        }));

        if (e.target.name == "encryptedCountryCode") {
            if (e.target.value == '')
                setStateList([]);
            else
                getStates(e.target.value);
        }
    };

    const sameAsClientCompanyDataChanged = () => {
        const request = {
            EncryptedClientCode: localStorage.getItem("EncryptedClientCode")
        }
        if ($('#clientChkBox').is(":checked")) {
            if (clientCompanyData.encryptedClientCode) {
                setCompanyData(clientCompanyData)
            }
            else {
                axios.post(process.env.REACT_APP_API_URL + '/get-client', request, {
                    headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('Token')).value}` }
                })
                    .then(res => {
                        if (res.data.status == 200) {
                            dispatch(clientDataAction(res.data.data))
                            setCompanyData(res.data.data)
                        } else {
                            toast.error(res.data.message, {
                                theme: 'colored',
                                autoClose: 10000
                            });
                        }
                    })
            }
        } else {
            dispatch(companyDetailsAction(undefined));
            $('#AddCompanyDetailsForm').get(0).reset();
        }
    }

    const setCompanyData = (clientCompanyData) => {
        const responseData = {
            encryptedClientCode: clientCompanyData.encryptedClientCode,
            companyName: clientCompanyData.customerName,
            address1: clientCompanyData.address1,
            address2: clientCompanyData.address2 ? clientCompanyData.address2 : '',
            address3: clientCompanyData.address3 ? clientCompanyData.address3 : '',
            companyGstNo: clientCompanyData.gstNumber,
            companyPan: clientCompanyData.panNumber,
            pinCode: clientCompanyData.pinCode ? clientCompanyData.pinCode : '',
            state: clientCompanyData.state,
            encryptedStateCode: clientCompanyData.encryptedStateCode,
            country: clientCompanyData.country,
            encryptedCountryCode: clientCompanyData.encryptedCountryCode,
            status: clientCompanyData.status
        }
        dispatch(companyDetailsAction(responseData))
    }


    return (
        <>
            <div>
                <Row className="justify-content-between align-items-center" id='clientChkBoxRow'>
                    <Col xs="auto">
                        <Form.Check type="checkbox" id="clientChkBox" className="mb-2">
                            <Form.Check.Input
                                type="checkbox"
                                name="Same as client"
                                onChange={sameAsClientCompanyDataChanged}
                            />
                            <Form.Check.Label className="mb-0 text-700">
                                Same as client
                            </Form.Check.Label>
                        </Form.Check>
                    </Col>
                </Row>
            </div>

            {companyData &&

                <Form noValidate validated={formHasError} className="details-form" onSubmit={e => { handleSubmit(e) }} id='AddCompanyDetailsForm'>
                    <Row>
                        <Col className="me-3 ms-3">
                            <Row className="mb-3">
                                <Form.Label>Company Logo</Form.Label>
                                <Form.Control type="file" />
                            </Row>
                            <Row className="mb-3">
                                <Form.Label>Company Name<span className="text-danger">*</span></Form.Label>
                                <Form.Control id="txtCompanyName" name="companyName" maxLength={50} value={companyData.companyName} onChange={handleFieldChange} placeholder="Company Name" required />
                                {Object.keys(companyError.companyNameErr).map((key) => {
                                    return <span className="error-message">{companyError.companyNameErr[key]}</span>
                                })}
                            </Row>
                            <Row className="mb-3">
                                <Form.Label>Company Shortname</Form.Label>
                                <Form.Control id="txtCompanyShortName" name="companyShortName" maxLength={20} value={companyData.companyShortName} onChange={handleFieldChange} placeholder="Company Shortname" />
                            </Row>
                            <Row className="mb-3">
                                <Form.Label>Company Type<span className="text-danger">*</span></Form.Label>
                                <Form.Control id="txtCompanyType" name="companyType" maxLength={3} value={companyData.companyType} onChange={handleFieldChange} placeholder="Company Type" required />
                                {Object.keys(companyError.companyTypeErr).map((key) => {
                                    return <span className="error-message">{companyError.companyTypeErr[key]}</span>
                                })}
                            </Row>
                            <Row className="mb-3">
                                <Form.Label>Company Address<span className="text-danger">*</span></Form.Label>
                                <Form.Control id="txtCompanyAddress" name="address1" maxLength={30} value={companyData.address1} onChange={handleFieldChange} className="mb-1" placeholder="Address" required />
                                {Object.keys(companyError.addressErr).map((key) => {
                                    return <span className="error-message">{companyError.addressErr[key]}</span>
                                })}
                                <Form.Control id="txtCompanyAddress2" name="address2" maxLength={30} value={companyData.address2} onChange={handleFieldChange} className="mb-1" placeholder="Address 2" />
                                <Form.Control id="txtCompanyAddress3" name="address3" maxLength={30} value={companyData.address3} onChange={handleFieldChange} className="mb-1" placeholder="Address 3" />
                            </Row>
                            <Row className="mb-3">
                                <Form.Label>Pincode</Form.Label>
                                <Form.Control id="txtPincode" name="pinCode" maxLength={10} value={companyData.pinCode} onChange={handleFieldChange} placeholder="Pincode" />
                            </Row>
                        </Col>

                        <Col className="me-3 ms-3">
                            <Row className="mb-3">
                                <Form.Label>Country<span className="text-danger">*</span></Form.Label>
                                <Form.Select id="txtCountry" name="encryptedCountryCode" defaultValue={companyData.countryCode} onChange={handleFieldChange} required>
                                    <option value=''>Select country</option>
                                    {countryList.map((option, index) => (
                                        <option key={index} value={option.value}>{option.key}</option>
                                    ))}
                                </Form.Select>
                                {Object.keys(companyError.countryErr).map((key) => {
                                    return <span className="error-message">{companyError.countryErr[key]}</span>
                                })}
                            </Row>
                            <Row className="mb-3">
                                <Form.Label>State<span className="text-danger">*</span></Form.Label>
                                <Form.Select id="txtState" name="encryptedStateCode" defaultValue={companyData.stateCode} onChange={handleFieldChange} required>
                                    <option value=''>Select state</option>
                                    {stateList.map((option, index) => (
                                        <option key={index} value={option.value}>{option.key}</option>
                                    ))}
                                </Form.Select>
                                {Object.keys(companyError.stateErr).map((key) => {
                                    return <span className="error-message">{companyError.stateErr[key]}</span>
                                })}
                            </Row>
                            <Row className="mb-3">
                                <Form.Label>Company Registration Date</Form.Label>
                                <Form.Control type='date' id="dtRegDate" name="companyRegDate" value={companyData.companyRegDate ? Moment(companyData.companyRegDate).format("YYYY-MM-DD") : ""} onChange={handleFieldChange} />
                                {Object.keys(companyError.regDateErr).map((key) => {
                                    return <span className="error-message">{companyError.regDateErr[key]}</span>
                                })}
                            </Row>
                            <Row className="mb-3">
                                <Form.Label>Company Registration No.</Form.Label>
                                <Form.Control id="txtRegNo" name="companyRegNo" maxLength={30} value={companyData.companyRegNo} onChange={handleFieldChange} placeholder="Company registration no" />
                            </Row>
                            <Row className="mb-3">
                                <Form.Label>Company Sales Tax</Form.Label>
                                <Form.Control id="txtSalesTax" name="companySalesTax" maxLength={30} value={companyData.companySalesTax} onChange={handleFieldChange} placeholder="Company sales tax" />
                            </Row>
                            <Row className="mb-3">
                                <Form.Label>Company Tin No.</Form.Label>
                                <Form.Control id="txtTinNo" name="companyTinNo" maxLength={30} value={companyData.companyTinNo} onChange={handleFieldChange} placeholder="Company TIN no" />
                            </Row>
                            <Row className="mb-3">
                                <Form.Label>Company PAN No.</Form.Label>
                                <Form.Control id="txtPanNo" name="companyPan" maxLength={30} value={companyData.companyPan} onChange={handleFieldChange} placeholder="Enter PAN number in caps" />
                                {Object.keys(companyError.panNoErr).map((key) => {
                                    return <span className="error-message">{companyError.panNoErr[key]}</span>
                                })}
                            </Row>
                        </Col>

                        <Col className="me-3 ms-3">
                            <Row className="mb-3">
                                <Form.Label>Company GST No.</Form.Label>
                                <Form.Control id="txtGstNo" name="companyGstNo" maxLength={30} value={companyData.companyGstNo} onChange={handleFieldChange} placeholder="Enter GST number in caps" />
                                {Object.keys(companyError.gstNoErr).map((key) => {
                                    return <span className="error-message">{companyError.gstNoErr[key]}</span>
                                })}
                            </Row>
                            <Row className="mb-3">
                                <Form.Label>Company LUT No.</Form.Label>
                                <Form.Control id="txtLutNo" name="companyLutNo" maxLength={30} value={companyData.companyLutNo} onChange={handleFieldChange} placeholder="Company LUT no" />
                            </Row>
                            <Row className="mb-3">
                                <Form.Label>Company Exp-Imp No.</Form.Label>
                                <Form.Control id="txtExpImpNo" name="companyExpImp" maxLength={30} value={companyData.companyExpImp} onChange={handleFieldChange} placeholder="Company export-import no" />
                            </Row>
                            <Row className="mb-3">
                                <Form.Label>Status</Form.Label>
                                <Form.Select id="txtStatus" name="status" value={companyData.status} onChange={handleFieldChange}>
                                    <option value="Active">Active</option>
                                    <option value="Suspended">Suspended</option>
                                </Form.Select>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            }
        </>
    )
}

export default Maintenance;