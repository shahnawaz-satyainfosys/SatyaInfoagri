const initialState = {
  clientDetailsError: {
    customerNameErr: {},
    clientAddressErr: {},
    countryErr: {},
    stateErr:{},
    billingAddressErr:{},
    billingCountryErr:{},
    billingStateErr:{},
    panNoErr:{},
    gstNoErr:{},
    noOfCompaniesErr:{},
    noOfUsersErr: {},
    contactDetailErr: {},
    transactionDetailErr: {}
  }
};

const clientDetailsErrorReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CLIENTDETAILSERROR':
      return{
        ...state,
        clientDetailsError : action.payload        
      }
    default:
      return state;
  }
};

export default clientDetailsErrorReducer;