import React, { useEffect, useState } from 'react';
import TabPage from 'components/common/TabPage';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { clientDetailsErrorAction } from 'actions';
import { contactDetailChangedAction } from 'actions';
import { transactionDetailChangedAction } from 'actions';
import { Spinner } from 'react-bootstrap';

const tabArray = ['Customer List', 'Customer Details', 'Transaction Details'];

const listColumnArray = [
  { accessor: 'sl', Header: 'S. No' },
  { accessor: 'customerName', Header: 'Customer Name' },
  { accessor: 'fullAddress', Header: 'Address' },
  { accessor: 'state', Header: 'State' },
  { accessor: 'country', Header: 'Country' },
  { accessor: 'contactPerson', Header: 'Contact Person' },
  { accessor: 'contactNo', Header: 'Contact No' },
  { accessor: 'status', Header: 'Status' }
];

export const Client = () => {

  const [listData, setListData] = useState([]);
  const [perPage, setPerPage] = useState(15);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async (page, size = perPage) => {
    let token = localStorage.getItem('Token');

    const listFilter = {
      pageNumber: page,
      pageSize: size
    };

    const response = await axios
      .post(process.env.REACT_APP_API_URL + '/client-list', listFilter, {
        headers: { Authorization: `Bearer ${JSON.parse(token).value}` }
      })
      .then(res => {
        if (res.data.status == 200) {
          setListData(res.data.data);
        }
      });
  };

  useEffect(() => {
    fetchUsers(1);
  }, []);

  const dispatch = useDispatch();

  const clientDetailsReducer = useSelector((state) => state.rootReducer.clientDetailsReducer)
  const clientData = clientDetailsReducer.clientDetails;

  const clientContactDetailsReducer = useSelector((state) => state.rootReducer.clientContactDetailsReducer)
  const contactDetailData = clientContactDetailsReducer.clientContactDetails;

  const transactionDetailsReducer = useSelector((state) => state.rootReducer.transactionDetailsReducer)
  const transactionDetailData = transactionDetailsReducer.transactionDetails;

  const contactChanged = useSelector((state) => state.rootReducer.contactDetailChangedReducer)
  let clientContactDetailChanged = contactChanged.contactDetailChanged;

  const transactionChanged = useSelector((state) => state.rootReducer.transactionDetailChangedReducer)
  let transactionDetailChanged = transactionChanged.transactionDetailChanged;

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

  $("#AddClientDetailsForm").trackChanges();

  const clientValidation = () => {
    const customerNameErr = {};
    const clientAddressErr = {};
    const countryErr = {};
    const stateErr = {};
    const billingAddressErr = {};
    const billingCountryErr = {};
    const billingStateErr = {};
    const panNoErr = {};
    const gstNoErr = {};
    const noOfCompaniesErr = {};
    const noOfUsersErr = {};
    const contactDetailErr = {};
    const transactionDetailErr = {};

    let isValid = true;

    if (!clientData.customerName) {
      customerNameErr.nameEmpty = "Enter customer name";
      isValid = false;
      setFormError(true);
    }

    if (!clientData.address1) {
      clientAddressErr.addressEmpty = "Enter address";
      isValid = false;
      setFormError(true);
    }

    if (!clientData.encryptedCountryCode) {
      countryErr.empty = "Select country";
      isValid = false;
      setFormError(true);
    }

    if (!clientData.encryptedStateCode) {
      stateErr.empty = "Select state";
      isValid = false;
      setFormError(true);
    }

    if (!clientData.billingAddress1) {
      billingAddressErr.billAddressEmpty = "Enter billing address";
      isValid = false;
      setFormError(true);
    }

    if (!clientData.encryptedBillCountryCode) {
      billingCountryErr.billCountryEmpty = "Select billing country";
      isValid = false;
      setFormError(true);
    }

    if (!clientData.encryptedBillStateCode) {
      billingStateErr.billStateEmpty = "Select billing state";
      isValid = false;
      setFormError(true);
    }

    if (!clientData.panNumber) {
      panNoErr.panNoEmpty = "Enter PAN number";
      isValid = false;
      setFormError(true);
    }
    // } else if (!(/[A-Z]{3}[CPHFATBLJG][A-Z]\d{4}[A-Z]/.test(clientData.PanNo))) {
    //   panNoErr.panNoInvalid = "Enter valid PAN number";
    //   isValid = false;
    //   setFormError(true);
    // }

    if (!clientData.gstNumber) {
      gstNoErr.gstNoEmpty = "Enter GST number";
      isValid = false;
      setFormError(true);
    }
    // else if (!(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(clientData.GstNo))) {
    //   gstNoErr.gstNoInvalid = "Enter valid GST number";
    //   isValid = false;
    //   setFormError(true);
    // }

    if (clientData.noOfComapnies <= 0 || clientData.noOfComapnies === null) {
      noOfCompaniesErr.noOfCompaniesEmpty = "Number of companies must be greater than 0";
      isValid = false;
      setFormError(true);
    }

    if (clientData.noOfUsers <= 0 || clientData.noOfUsers === null) {
      noOfUsersErr.noOfUsersEmpty = "Number of users must be greater than 0";
      isValid = false;
      setFormError(true);
    }
    if (contactDetailData.length < 1) {
      contactDetailErr.contactEmpty = "At least one contact detail required";
      setTimeout(() => {
        toast.error(contactDetailErr.contactEmpty, {
          theme: 'colored'
        });
      }, 500);
      isValid = false;
      $('[data-rr-ui-event-key*="Customer Details"]').trigger('click');

      setTimeout(() => {
        document.getElementById("ContactDetailsTable").scrollIntoView({ behavior: 'smooth' });
      }, 500)

      setFormError(true);
      $("#TransactionDetailsListCard").show();
    }

    if (transactionDetailData.length < 1) {
      transactionDetailErr.transactionEmpty = "At least one transaction detail required";
      setTimeout(() => {
        toast.error(transactionDetailErr.transactionEmpty, {
          theme: 'colored'
        });
      }, 1000);
      isValid = false;
      if (!contactDetailErr.contactEmpty)
        $('[data-rr-ui-event-key*="Transaction Details"]').trigger('click');
      setFormError(true);
    }

    if (!isValid) {
      var errorObject = {
        customerNameErr,
        clientAddressErr,
        countryErr,
        stateErr,
        billingAddressErr,
        billingCountryErr,
        billingStateErr,
        panNoErr,
        gstNoErr,
        noOfCompaniesErr,
        noOfUsersErr,
        contactDetailErr,
        transactionDetailErr
      }
      dispatch(clientDetailsErrorAction(errorObject))
    }

    return isValid;
  }

  const addClientDetails = () => {
    if (clientValidation()) {
      const userData = {
        ClientName: clientData.customerName,
        ClientAddress1: clientData.address1,
        ClientAddress2: clientData.address2 ? clientData.address2 : '',
        ClientAddress3: clientData.address3 ? clientData.address3 : '',
        PINCode: clientData.pinCode ? clientData.pinCode : '',
        EncryptedCountryCode: clientData.encryptedCountryCode,
        EncryptedStateCode: clientData.encryptedStateCode,
        ClientBillAddress1: clientData.billingAddress1,
        ClientBillAddress2: clientData.billingAddress2 ? clientData.billingAddress2 : '',
        ClientBillAddress3: clientData.billingAddress3 ? clientData.billingAddress3 : '',
        BillPINCode: clientData.billingPinCode,
        EncryptedBillCountryCode: clientData.encryptedBillCountryCode,
        EncryptedBillStateCode: clientData.encryptedBillStateCode,
        ClientPANNO: clientData.panNumber,
        ClientGSTNO: clientData.gstNumber,
        ActiveStatus: clientData.status == null || clientData.status == "Active" ? "A" : "S",
        NoOfCompany: parseInt(clientData.noOfComapnies),
        NoOfUsers: parseInt(clientData.noOfUsers),
        AddUser: localStorage.getItem("LoginUserName"),
        ClientContactDetails: contactDetailData,
        ClientRegistrationAuthorization: transactionDetailData
      }

      setIsLoading(true);
      axios.post(process.env.REACT_APP_API_URL + '/add-client', userData)
        .then(res => {
          setIsLoading(false);
          if (res.data.status == 200) {
            toast.success(res.data.message, {
              theme: 'colored'
            });
            updateCallback();
            // To-do: Do not redirect to List, instead change Save button click function to updateClient after successfully add
            $('[data-rr-ui-event-key*="List"]').click();
          } else {
            toast.error(res.data.message, {
              theme: 'colored'
            });
          }
        })
    }
  }

  const updateCallback = () => {

    $("#AddClientDetailsForm").data("changed", false);

    clientContactDetailChanged = {
      clientContactDetailChanged: false
    }

    dispatch(contactDetailChangedAction(clientContactDetailChanged));

    transactionDetailChanged = {
      transactionDetailChanged: false
    }

    dispatch(transactionDetailChangedAction(transactionDetailChanged));

    localStorage.removeItem("DeleteContactDetailsId");

    toast.success("Client details updated successfully!", {
      theme: 'colored'
    });

    $('#btnSave').attr('disabled', true)

    fetchUsers(1);
  }

  const updateClientDetails = () => {
    if (clientValidation()) {
      const updatedUserData = {
        EncryptedClientCode: clientData.encryptedClientCode,
        ClientName: clientData.customerName,
        ClientAddress1: clientData.address1,
        ClientAddress2: clientData.address2,
        ClientAddress3: clientData.address3,
        PINCode: clientData.pinCode,
        EncryptedCountryCode: clientData.encryptedCountryCode,
        EncryptedStateCode: clientData.encryptedStateCode,
        ClientBillAddress1: clientData.billingAddress1,
        ClientBillAddress2: clientData.billingAddress2,
        ClientBillAddress3: clientData.billingAddress3,
        BillPINCode: clientData.billingPinCode,
        EncryptedBillCountryCode: clientData.encryptedBillCountryCode,
        EncryptedBillStateCode: clientData.encryptedBillStateCode,
        ClientPANNO: clientData.panNumber,
        ClientGSTNO: clientData.gstNumber,
        ActiveStatus: !clientData.status || clientData.status == "Active" ? "A" : "S",
        NoOfCompany: parseInt(clientData.noOfComapnies),
        NoOfUsers: parseInt(clientData.noOfUsers),
        ModifyUser: localStorage.getItem("LoginUserName")
      }

      var updateRequired = $("#AddClientDetailsForm").isChanged() || clientContactDetailChanged.contactDetailsChanged || transactionDetailChanged.transactionDetailChanged;

      if (!updateRequired) {
        toast.warning("Nothing to change!", {
          theme: 'colored'
        });

        return;
      }

      if ($("#AddClientDetailsForm").isChanged()) {
        setIsLoading(true);
        axios.post(process.env.REACT_APP_API_URL + '/update-client', updatedUserData, {
          headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('Token')).value}` }
        })
          .then(res => {
            setIsLoading(false);
            if (res.data.status != 200) {
              toast.error(res.data.message, {
                theme: 'colored'
              });
            }
            else if (!clientContactDetailChanged.contactDetailsChanged && !transactionDetailChanged.transactionDetailChanged) {
              updateCallback();
            }
          })
        $('#AddClientDetailsForm').get(0).reset();
      }

      var deleteContactDetailsId = localStorage.getItem("DeleteContactDetailsId")

      if (clientContactDetailChanged.contactDetailsChanged) {
        var loopBreaked = false;
        var contactDetailIndex = 1;

        contactDetailData.forEach(async contactDetails => {
          if (!loopBreaked) {
            if (contactDetails.encryptedClientContactDetailsId) {
              const updateContactDetailResponse = await axios.post(process.env.REACT_APP_API_URL + '/update-client-contact-detail', contactDetails);
              
              if (updateContactDetailResponse.data.status != 200) {
                toast.error(updateContactDetailResponse.data.message, {
                  theme: 'colored'
                });
                loopBreaked = true;
              }
              else if (contactDetailIndex == contactDetailData.length && !loopBreaked && !deleteContactDetailsId) {
                updateCallback();
              }
              else {
                contactDetailIndex++;
              }
            }
            else if (!contactDetails.encryptedClientContactDetailsId) {
              const addContactDetailResponse = await axios.post(process.env.REACT_APP_API_URL + '/add-client-contact-details', contactDetails);
              if (addContactDetailResponse.data.status != 200) {
                toast.error(addContactDetailResponse.data.message, {
                  theme: 'colored'
                });
                loopBreaked = true;
              }
              else if (contactDetailIndex == contactDetailData.length && !loopBreaked && !deleteContactDetailsId) {
                updateCallback();
              }
              else {
                contactDetailIndex++;
              }
            }
          }
        });

        if (deleteContactDetailsId && clientContactDetailChanged.contactDetailsChanged && !loopBreaked) {
          const data = { encryptedClientContactDetailsId: deleteContactDetailsId }
          axios.delete(process.env.REACT_APP_API_URL + '/delete-client-contact-detail', { data })
            .then(res => {
              setIsLoading(false);
              if (res.data.status != 200) {
                toast.error(res.data.message, {
                  theme: 'colored'
                });
                loopBreaked = true;
              }
              else if (!loopBreaked && !transactionDetailChanged.transactionDetailChanged) {
                updateCallback();
              }
            })
        }
      }

      if (transactionDetailChanged.transactionDetailChanged && !loopBreaked) {
        var transactionDetailIndex = 1;
        var newTransactions = transactionDetailData.filter(x => !x.encryptedClientRegisterationAuthorizationId);
        newTransactions.forEach(async (transactionDetail) => {
          // if (transactionDetail.encryptedClientRegisterationAuthorizationId == '') {
          //   delete transactionDetail.encryptedClientRegisterationAuthorizationId;
            const transactionDetailResponse = await axios.post(process.env.REACT_APP_API_URL + '/add-client-registration-authorization', transactionDetail);
            if (transactionDetailResponse.data.status != 200) {
              toast.error(transactionDetailResponse.data.message, {
                theme: 'colored'
              });

              loopBreaked = true;
            }
            else if (transactionDetailIndex == newTransactions.length && !loopBreaked) {
              updateCallback();
            }
          //}
        })
      }
    }
  };

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
        module="Client"
        saveDetails={!clientData.encryptedClientCode ? addClientDetails : updateClientDetails}
      />
    </>
  )
};

export default Client;