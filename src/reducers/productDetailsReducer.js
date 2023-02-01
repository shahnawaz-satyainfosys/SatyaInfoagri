const initialState = {
  productDetails: {}
};

const productDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PRODUCTDETAILS':
      if(!action.payload) {
        return initialState
      }
      else{
        return{
          ...state,
          productDetails : action.payload
        }
      }
    default:
      return state;
  }
};

export default productDetailsReducer;