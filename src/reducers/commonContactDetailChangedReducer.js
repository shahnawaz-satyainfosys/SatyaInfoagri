const initialState = {
  commonContactDetailChanged: {}
};

const commonContactDetailChangedReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'COMMONCONTACTDETAILCHANGED':
      if(!action.payload)
      {
        return initialState
      }
      else{
        return{
          ...state,
          commonContactDetailChanged : action.payload
        }
      }
    default:
      return state;
  }
};

export default commonContactDetailChangedReducer;