const initialState = {
  transactionDetails: []
};

const transactionDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TRANSACTIONLIST':
      if(Array.isArray(action.payload))
      {
        return{
          ...state,
          transactionDetails : action.payload
        }
      }
      else{
        return{
          ...state,
          transactionDetails : [...state.transactionDetails, action.payload]
        }
      }
    default:
      return state;
  }
};

export default transactionDetailsReducer;