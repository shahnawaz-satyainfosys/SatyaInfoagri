const initialState = {
  transactionDetails: []
};

const transactionDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TRANSACTIONLIST':
      return{
        ...state,
        transactionDetails : [...state.transactionDetails, action.payload]
      }
    default:
      return state;
  }
};

export default transactionDetailsReducer;