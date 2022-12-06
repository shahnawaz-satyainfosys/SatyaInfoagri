import React from 'react';
import { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { transactionDetailsAction } from 'actions';

export const TransactionDetails = () => {

    var initialState = {
        moduleName: '',
        startDate: '',
        endDate: '',
        paymentMode: '',
        chequeNo: '',
        chequeDate: '',
        chequeBank: '',
        amount: 0,
        gstPercentage: 0
    }

    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const [amountPayable, setAmountPayable] = useState();
    const [moduleList, setModuleList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [formHasError, setFormError] = useState(false);
    const [moduleNameErr, setModuleNameErr] = useState({});
    const [startDateErr, setStartDateErr] = useState({});
    const [endDateErr, setEndDateErr] = useState({});
    const [amountErr, setAmountErr] = useState({});

    useEffect(() => {
        getModule();
    }, []);

    const getModule = async () => {
        axios
            .get(process.env.REACT_APP_API_URL + '/security-module-master-list')
            .then(res => {
                if (res.data.status == 200) {
                    let moduleData = [];
                    if (res.data && res.data.data.length > 0)
                        res.data.data.forEach(module => {
                            moduleData.push({
                                key: module.moduleName,
                                value: module.encryptedModuleCode
                            });
                        });
                    setModuleList(moduleData);
                }
            });
    }

    const validateTransactionDetails = () => {
        const moduleNameErr = {};
        const startDateErr = {};
        const endDateErr = {};
        const amountErr = {};

        let isValid = true;

        if (!formData.moduleName) {
            moduleNameErr.moduleNameEmpty = "Select module name";
            isValid = false;
            setFormError(true);
        }

        if (!formData.startDate) {
            startDateErr.startDateEmpty = "Select start date";
            isValid = false;
            setFormError(true);
        }

        if (!formData.endDate) {
            endDateErr.endDateEmpty = "Select end date";
            isValid = false;
            setFormError(true);
        }

        if (formData.amount <= 0) {
            amountErr.amountEmpty = "Amount should be greater than zero";
            isValid = false;
            setFormError(true);
        }

        if (!isValid) {
            setModuleNameErr(moduleNameErr);
            setStartDateErr(startDateErr);
            setEndDateErr(endDateErr);
            setAmountErr(amountErr);
        }

        return isValid;
    }

    const submitTransactionDetails = e => {
        e.preventDefault();

        const form = e.currentTarget;

        if (validateTransactionDetails()) {
            const transactionData = {
                encryptedClientRegisterationAuthorizationId: "",
                encryptedClientCode: localStorage.getItem("EncryptedResponseClientCode"),
                encryptedModuleCode: formData.moduleName,
                moduleName: $("#selModuleName").find("option:selected").text(),
                startdate: formData.startDate,
                endDate: formData.endDate,
                paymentMode: formData.paymentMode,
                chequeNo: formData.chequeNo,
                chequeDate: formData.chequeDate ? formData.chequeDate : new Date(),
                chequeBank: formData.chequeBank,
                gstPercent: parseFloat(formData.gstPercentage),
                amount: parseFloat(formData.amount),
                addUser: localStorage.getItem("LoginUserName"),
                totalAmount: amountPayable
            }
             
            dispatch(transactionDetailsAction(transactionData));

            $("#TransactionDetailsTable").show();
            $("#TransactionDetailsListCard").show();

            setAmountPayable('');
            setFormData(initialState);
            $(form)[0].reset();
        }
    };

    const handleFieldChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        if (e.target.name == "paymentMode") {
            if (e.target.value != '')
            {
                if(e.target.value == "TT")
                {
                    $('#lblPaymentModeNo').text('TT No.');
                    $('#lblPaymentModeDate').text('TT Date');
                    $('#lblPaymentModeBankName').text('TT Bank');
                    $('.payment-mode-details').show();
                }
                else if(e.target.value == "CQ"){
                    $('#lblPaymentModeNo').text('Cheque No.');
                    $('#lblPaymentModeDate').text('Cheque Date');
                    $('#lblPaymentModeBankName').text('Cheque Bank');
                    $('.payment-mode-details').show();
                }
                else{
                    $('.payment-mode-details').hide();
                }
            }
          }
    };

    const handleAmountChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        if (e.target.value > 0) {
            getTotalAmountWithGST(e.target.value, formData.gstPercentage);
        }
        else {
            setAmountPayable(0)
        }
    }

    const handleGstChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        if (e.target.value > 0) {
            getTotalAmountWithGST(formData.amount, e.target.value);
        }
        else {
            getTotalAmountWithGST(formData.amount);
        }
    }

    const getTotalAmountWithGST = (amount, gstPercentage = 0) => {
        var gstAmount = gstPercentage > 0 ? parseFloat((amount * gstPercentage) / 100) : 0;
        setAmountPayable(parseFloat(amount) + gstAmount);
    }

    return (
        <>
            {isLoading ? (
                <Spinner
                    className="position-absolute start-50 loader-color"
                    animation="border"
                />
            ) : null}

            <Form noValidate validated={formHasError} className="details-form" onSubmit={e => { submitTransactionDetails(e) }} id='AddClientTransactionDetailsForm'>
                <Row>
                    <Col className="me-5 ms-5">
                        <Row className="mb-3">
                            <Form.Label>Module Name<span className="text-danger">*</span></Form.Label>
                            <Form.Select name="moduleName" id="selModuleName" onChange={handleFieldChange} required>
                                <option value=''>Select Module</option>
                                {moduleList.map((option, index) => (
                                    <option key={index} value={option.value}>{option.key}</option>
                                ))}
                            </Form.Select>
                            {Object.keys(moduleNameErr).map((key) => {
                                return <span className="error-message">{moduleNameErr[key]}</span>
                            })}
                        </Row>
                        <Row className="mb-3">
                            <Form.Label>Start Date<span className="text-danger">*</span></Form.Label>
                            <Form.Control type='date' id="dtStartDate" name="startDate" onChange={handleFieldChange} required />
                            {Object.keys(startDateErr).map((key) => {
                                return <span className="error-message">{startDateErr[key]}</span>
                            })}
                        </Row>
                        <Row className="mb-3">
                            <Form.Label>End Date<span className="text-danger">*</span></Form.Label>
                            <Form.Control type='date' id="dtEndDate" name="endDate" onChange={handleFieldChange} required />
                            {Object.keys(endDateErr).map((key) => {
                                return <span className="error-message">{endDateErr[key]}</span>
                            })}
                        </Row>
                    </Col>

                    <Col className="me-5 ms-5">
                        <Row className="mb-3">
                            <Form.Label>Payment Mode</Form.Label>
                            <Form.Select id="txtPaymentMode" name="paymentMode" onChange={handleFieldChange}>
                                <option value=''>Select payment mode</option>
                                <option value="CQ">Cheque</option>
                                <option value="CS">Cash</option>
                                <option value="TT">TT</option>
                            </Form.Select>
                        </Row>
                        <Row className="mb-3 payment-mode-details">
                            <Form.Label id="lblPaymentModeNo">Cheque No.</Form.Label>
                            <Form.Control id="txtChequeNo" name="chequeNo" onChange={handleFieldChange} placeholder="Enter number" />
                        </Row>
                        <Row className="mb-3 payment-mode-details">
                            <Form.Label id="lblPaymentModeDate">Cheque Date</Form.Label>
                            <Form.Control type='date' id="txtChequeDate" name="chequeDate" onChange={handleFieldChange} placeholder="Select date" />
                        </Row>
                        <Row className="mb-3 payment-mode-details">
                            <Form.Label id="lblPaymentModeBankName">Cheque Bank</Form.Label>
                            <Form.Control id="txtChequeBank" name="chequeBank" onChange={handleFieldChange} placeholder="Enter bank name" />
                        </Row>
                    </Col>

                    <Col className="me-5 ms-5">
                        <Row className="mb-3">
                            <Form.Label>Amount<span className="text-danger">*</span></Form.Label>
                            <Form.Control type='number' id="txtAmount" name="amount" min={0} onChange={handleAmountChange} placeholder="Enter amount" required />
                            {Object.keys(amountErr).map((key) => {
                                return <span className="error-message">{amountErr[key]}</span>
                            })}
                        </Row>
                        <Row className="mb-3">
                            <Form.Label>GST Percentage</Form.Label>
                            <Form.Control type='number' id="numGstPercent" name="gstPercentage" min={0} onChange={handleGstChange} placeholder="Enter gst percentage" />
                        </Row>
                        <Row className="mb-3">
                            <Form.Label>Total Amount Payable</Form.Label>
                            <Form.Control type='number' id="numAmountPayable" name="totalAmount" value={amountPayable} onChange={handleFieldChange} placeholder="Total amount" />
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
    )
}

export default TransactionDetails;