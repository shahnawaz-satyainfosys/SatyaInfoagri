const initialState = {
  addTransactionDetails: []
};

const addTransactionDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADDTRANSACTIONDETAILS':
      return{
        ...state,
        addTransactionDetails : [...state.addTransactionDetails, ...action.payload]
      }
    default:
      return state;
  }
};

export default addTransactionDetailsReducer;