const initialState = {
  contactDetailChanged: {}
};

const contactDetailChangedReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CONTACTDETAILCHANGED':
      return{
        ...state,
        contactDetailChanged : action.payload
      }
    default:
      return state;
  }
};

export default contactDetailChangedReducer;