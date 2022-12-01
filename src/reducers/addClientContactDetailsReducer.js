const initialState = {
  addClientContactDetails: []
};

const addClientContactDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADDCLIENTCONTACTDETAILS':
      const newContactDetail = {}
      return{
        ...state,
        addClientContactDetails : [...state.addClientContactDetails, ...action.payload]
      }
    default:
      return state;
  }
};

export default addClientContactDetailsReducer;