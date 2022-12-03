const initialState = {
  clientContactDetails: []
};

const clientContactDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CLIENTCONTACTDETAILSLIST':
      if(Array.isArray(action.payload))
      {
        return{
          ...state,
          clientContactDetails : action.payload
        }
      }
      else{
        return{
          ...state,
          clientContactDetails : [...state.clientContactDetails, action.payload]
        }
      }
    default:
      return state;
  }
};

export default clientContactDetailsReducer;