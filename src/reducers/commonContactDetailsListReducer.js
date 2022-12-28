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
          commonContactDetailsList : action.payload
        }
      }
      else{
        return{
          ...state,
          commonContactDetailsList : [...state.commonContactDetailsList, action.payload]
        }
      }
    default:
      return state;
  }
};

export default commonContactDetailsListReducer;