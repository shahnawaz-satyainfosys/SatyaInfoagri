const initialState = {
  updateClientContactDetails: []
};

const updateClientContactDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATECLIENTCONTACTDETAILS':
      return{
        ...state,
        updateClientContactDetails : action.payload
      }
    default:
      return state;
  }
};

export default updateClientContactDetailReducer;