const initialState = {
  commonContactDetails: []
};

const commonContactDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'COMMONCONTACTDETAILS':
      return{
        ...state,
        commonContactDetails : action.payload
      }
    default:
      return state;
  }
};

export default commonContactDetailsReducer;