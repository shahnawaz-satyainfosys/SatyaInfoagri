const initialState = {
  companyDetails: {}
};

const companyDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'COMPANYDETAILS':
      if(!action.payload) {
        return initialState
      }
      else{
        return{
          ...state,
          companyDetails : action.payload
        }
      }
    default:
      return state;
  }
};

export default companyDetailsReducer;