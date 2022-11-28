const initialState = {
  clientContactDetails: []
};

const clientContactDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CLIENTCONTACTDETAILSLIST':
      return{
        ...state,
        clientContactDetails : action.payload
      }
    default:
      return state;
  }
};

export default clientContactDetailsReducer;