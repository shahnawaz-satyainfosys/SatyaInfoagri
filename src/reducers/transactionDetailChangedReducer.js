const initialState = {
  transactionDetailChanged: {}
};

const transactionDetailChangedReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TRANSACTIONDETAILCHANGED':
      return{
        ...state,
        transactionDetailChanged : action.payload
      }
    default:
      return state;
  }
};

export default transactionDetailChangedReducer;