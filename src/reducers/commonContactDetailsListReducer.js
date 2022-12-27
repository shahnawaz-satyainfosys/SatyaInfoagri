const initialState = {
  commonContactDetailsList: []
};

const commonContactDetailsListReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'COMMONCONTACTDETAILSLIST':
      if(!action.payload)
      {
        return initialState
      }
      else if(Array.isArray(action.payload))
      {
        return{
          ...state,
          commonContactDetails : action.payload
        }
      }
      else{
        return{
          ...state,
          commonContactDetails : [...state.commonContactDetails, action.payload]
        }
      }
    default:
      return state;
  }
};

export default commonContactDetailsListReducer;