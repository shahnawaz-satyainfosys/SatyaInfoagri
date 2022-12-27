const initialState = {
  companyDetailsError: {
    companyNameErr: {},
    companyTypeErr: {},
    addressErr: {},
    countryErr: {},
    stateErr:{}
  }
};

const companyDetailsErrorReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'COMPANYDETAILSERROR':
      if(!action.payload)
      {
        return initialState
      }
      else{
        return{
          ...state,
          companyDetailsError : action.payload        
        }
      }
    default:
      return state;
  }
};

export default companyDetailsErrorReducer;