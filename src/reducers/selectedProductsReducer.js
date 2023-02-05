const initialState = {
  selectedProducts: []
};

const selectedProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SELECTEDPRODUCTS':
      if(!action.payload) {
        return initialState
      }
      else{
        return{
          ...state,
          selectedProducts : action.payload
        }
      }
    default:
      return state;
  }
};

export default selectedProductsReducer;