import React, { useState, useEffect } from 'react';
import TabPage from 'components/common/TabPage';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { companyDetailsAction, commonContactDetailsAction, companyDetailsErrorAction } from '../../actions/index';

const tabArray = ['Company List', 'Maintenance'];

const listColumnArray = [
    { accessor: 'sl', Header: 'S. No' },
    { accessor: 'companyName', Header: 'Company Name' },
    { accessor: 'companyType', Header: 'Company Type' },
    { accessor: 'state', Header: 'State' },
    { accessor: 'country', Header: 'Country' },
    { accessor: 'status', Header: 'Status' }
];

export const CompanyMaster = () => {

    const [listData, setListData] = useState([]);
    const [perPage, setPerPage] = useState(15);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const fetchCompanyList = async (page, size = perPage) => {
        let token = localStorage.getItem('Token');

        const listFilter = {
            pageNumber: page,
            pageSize: size,
            EncryptedClientCode: localStorage.getItem("EncryptedClientCode")
        };

        const response = await axios
            .post(process.env.REACT_APP_API_URL + '/company-list', listFilter, {
                headers: { Authorization: `Bearer ${JSON.parse(token).value}` }
            })
            .then(res => {
                if (res.data.status == 200) {
                    setListData(res.data.data);
                }
            });
    };

    useEffect(() => {
        fetchCompanyList(1);
        $("#btnNew").show();
        $("#btnSave").hide();
        $("#btnCancel").hide();
        $('[data-rr-ui-event-key*="Maintenance"]').attr('disabled', true);
    }, []);

    const companyDetailsReducer = useSelector((state) => state.rootReducer.companyDetailsReducer)
    const companyData = companyDetailsReducer.companyDetails;

    const [formHasError, setFormError] = useState(false);


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

    $("#AddCompanyDetailsForm").trackChanges();

    const clearCompanyReducers = () => {
        dispatch(companyDetailsAction(undefined));
        dispatch(commonContactDetailsAction(undefined));
        dispatch(companyDetailsErrorAction(undefined));
        $("#AddCompanyDetailsForm").data("changed", false);
    }

    $('[data-rr-ui-event-key*="Company List"]').click(function () {
        $("#btnNew").show();
        $("#btnSave").hide();
        $("#btnCancel").hide();
        $('[data-rr-ui-event-key*="Maintenance"]').attr('disabled', true);
        $('#AddCompanyDetailsForm').get(0).reset();
        clearCompanyReducers();
    })

    $('[data-rr-ui-event-key*="Maintenance"]').click(function () {
        $("#btnNew").hide();
        $("#btnSave").show();
        $("#btnCancel").show();
    })

    const newDetails = () => {
        $('[data-rr-ui-event-key*="Maintenance"]').attr('disabled', false);
        $('[data-rr-ui-event-key*="Maintenance"]').trigger('click');
        $('#btnSave').attr('disabled', false);
        $("#AddCompanyDetailsForm").data("changed", false);
        clearCompanyReducers();
    }

    const cancelClick = () => {
    $('#btnExit').attr('isExit', 'false');
    if ($("#AddCompanyDetailsForm").isChanged()
    ) {
      setModalShow(true);
    }
    else {
      $('[data-rr-ui-event-key*="List"]').trigger('click');
    }
  }

  const exitModule = () => {
    $('#btnExit').attr('isExit', 'true');
    if (($("#AddCompanyDetailsForm").isChanged())) {
      setModalShow(true);
    }
    else {
      window.location.href = '/dashboard';
    }
  }

    const companyValidation = () => {
        const companyNameErr = {};
        const companyTypeErr = {};
        const addressErr = {};
        const countryErr = {};
        const stateErr = {};

        let isValid = true;

        if (!companyData.companyName) {
            companyNameErr.nameEmpty = "Enter company name";
            isValid = false;
            setFormError(true);
        }

        if (!companyData.companyType) {
            companyTypeErr.addressEmpty = "Enter address";
            isValid = false;
            setFormError(true);
        }

        if (!companyData.encryptedCountryCode) {
            countryErr.empty = "Select country";
            isValid = false;
            setFormError(true);
        }

        if (!companyData.encryptedStateCode) {
            stateErr.empty = "Select state";
            isValid = false;
            setFormError(true);
        }

        if (!companyData.address1) {
            addressErr.addressEmpty = "Enter address";
            isValid = false;
            setFormError(true);
        }

        if (!isValid) {
            var errorObject = {
                companyNameErr,
                companyTypeErr,
                addressErr,
                countryErr,
                stateErr
            }
            dispatch(companyDetailsErrorAction(errorObject))
        }

        return isValid;
    }

    const addCompanyDetails = () => {
        if (companyValidation()) {
            const requestData = {
                encryptedClientCode: localStorage.getItem("EncryptedClientCode"),
                companyName: companyData.companyName,
                companyShortName: companyData.companyShortName,
                address1: companyData.address1,
                address2: companyData.address2 ? companyData.address2 : '',
                address3: companyData.address3 ? companyData.address3 : '',
                encryptedCountryCode: companyData.encryptedCountryCode,
                encryptedStateCode: companyData.encryptedStateCode,
                companyRegDate: companyData.companyRegDate ? companyData.companyRegDate : '',
                companyRegNo: companyData.companyRegNo ? companyData.companyRegNo : '',
                companySalesTax: companyData.companySalesTax ? companyData.companySalesTax : '',
                companyTinNo: companyData.companyTinNo ? companyData.companyTinNo : '',
                companyPan: companyData.companyPan ? companyData.companyPan : '',
                companyGstNo: companyData.companyGstNo ? companyData.companyGstNo : '',
                companyLutNo: companyData.companyLutNo ? companyData.companyLutNo : '',
                companyExpImp: companyData.companyExpImp ? companyData.companyExpImp : '',
                companyLogo: companyData.companyLogo ? companyData.companyLogo : '',
                pinCode: companyData.pinCode ? companyData.pinCode : '',
                activeStatus: companyData.status == null || companyData.status == "Active" ? "A" : "S",
                addUser: localStorage.getItem("LoginUserName")
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
            <TabPage
                listData={listData}
                listColumnArray={listColumnArray}
                tabArray={tabArray}
                module="CompanyMaster"
                newDetails={newDetails}
                saveDetails={addCompanyDetails}
                cancelClick={cancelClick}
                exitModule={exitModule}
            />
        </>
    )
};

export default CompanyMaster;