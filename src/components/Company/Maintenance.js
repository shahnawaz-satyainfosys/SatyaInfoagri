import React, { useState, useEffect } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import { companyDetailsAction } from 'actions';
import { useDispatch, useSelector } from 'react-redux';

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

    return (
        <>
            {companyData &&

                <Form noValidate validated={formHasError} className="details-form" onSubmit={e => { handleSubmit(e) }} id='AddCompanyDetailsForm'>
                    <Row>
                        <Col className="me-3 ms-3">
                            <Row className="mb-3">
                                <Form.Label>Company Name<span className="text-danger">*</span></Form.Label>
                                <Form.Control id="txtCompanyName" name="companyName" maxLength={50} value={companyData.companyName} onChange={handleFieldChange} placeholder="Company Name" required />
                                {Object.keys(companyError.companyNameErr).map((key) => {
                                    return <span className="error-message">{companyError.companyNameErr[key]}</span>
                                })}
                            </Row>
                            <Row className="mb-3">
                                <Form.Label>Company Shortname</Form.Label>
                                <Form.Control id="txtCompanyShortName" name="companyShortName" maxLength={50} value={companyData.companyShortName} onChange={handleFieldChange} placeholder="Company Name" />
                            </Row>
                            <Row className="mb-3">
                                <Form.Label>Company Type<span className="text-danger">*</span></Form.Label>
                                <Form.Control id="txtCompanyType" name="companyType" maxLength={50} value={companyData.companyType} onChange={handleFieldChange} placeholder="Company Type" required />
                                {Object.keys(companyError.companyTypeErr).map((key) => {
                                    return <span className="error-message">{companyError.companyTypeErr[key]}</span>
                                })}
                            </Row>
                            <Row className="mb-3">
                                <Form.Label>Company Address<span className="text-danger">*</span></Form.Label>
                                <Form.Control id="txtCompanyAddress" name="address1" maxLength={50} value={companyData.address1} onChange={handleFieldChange} className="mb-1" placeholder="Address" required />
                                {Object.keys(companyError.addressErr).map((key) => {
                                    return <span className="error-message">{companyError.addressErr[key]}</span>
                                })}
                                <Form.Control id="txtCompanyAddress2" name="address2" maxLength={50} value={companyData.address2} onChange={handleFieldChange} className="mb-1" placeholder="Address 2" />
                                <Form.Control id="txtCompanyAddress3" name="address3" maxLength={50} value={companyData.address3} onChange={handleFieldChange} className="mb-1" placeholder="Address 3" />
                            </Row>
                            <Row className="mb-3">
                                <Form.Label>Pincode</Form.Label>
                                <Form.Control id="txtPincode" name="pinCode" maxLength={10} value={companyData.pinCode} onChange={handleFieldChange} placeholder="Pincode" />
                            </Row>
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
                        </Col>

                        <Col className="me-3 ms-3">
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
                                <Form.Control type='date' id="dtRegDate" name="companyRegDate" value={companyData.companyRegDate} onChange={handleFieldChange} />
                            </Row>
                            <Row className="mb-3">
                                <Form.Label>Company Registration No.</Form.Label>
                                <Form.Control id="txtRegNo" name="companyRegNo" maxLength={10} value={companyData.companyRegNo} onChange={handleFieldChange} placeholder="Company registration no" />
                            </Row>
                            <Row className="mb-3">
                                <Form.Label>Company Sales Tax</Form.Label>
                                <Form.Control id="txtSalesTax" name="companySalesTax" maxLength={10} value={companyData.companySalesTax} onChange={handleFieldChange} placeholder="Company sales tax" />
                            </Row>
                            <Row className="mb-3">
                                <Form.Label>Company Tin No.</Form.Label>
                                <Form.Control id="txtTinNo" name="companyTinNo" maxLength={10} value={companyData.companyTinNo} onChange={handleFieldChange} placeholder="Company TIN no" />
                            </Row>
                            <Row className="mb-3">
                                <Form.Label>Company PAN No.</Form.Label>
                                <Form.Control id="txtPanNo" name="companyPan" maxLength={10} value={companyData.companyPan} onChange={handleFieldChange} placeholder="Company PAN no" />
                            </Row>
                        </Col>

                        <Col className="me-3 ms-3">
                            <Row className="mb-3">
                                <Form.Label>Company GST No.</Form.Label>
                                <Form.Control id="txtGstNo" name="companyGstNo" maxLength={10} value={companyData.companyGstNo} onChange={handleFieldChange} placeholder="Company GST no" />
                            </Row>
                            <Row className="mb-3">
                                <Form.Label>Company LUT No.</Form.Label>
                                <Form.Control id="txtLutNo" name="companyLutNo" maxLength={10} value={companyData.companyLutNo} onChange={handleFieldChange} placeholder="Company LUT no" />
                            </Row>
                            <Row className="mb-3">
                                <Form.Label>Company Exp-Imp No.</Form.Label>
                                <Form.Control id="txtExpImpNo" name="companyExpImp" maxLength={10} value={companyData.companyExpImp} onChange={handleFieldChange} placeholder="Company export-import no" />
                            </Row>
                            <Row className="mb-3">
                                <Form.Label>Company Logo</Form.Label>
                                <Form.Control id="txtLogo" name="companyLogo" maxLength={10} value={companyData.companyLogo} onChange={handleFieldChange} placeholder="Company logo" />
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