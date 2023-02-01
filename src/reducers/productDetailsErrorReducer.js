const initialState = {
  productDetailsError: {
    moduleNameErr: {}    
  }
};

const productDetailsErrorReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PRODUCTDETAILSERROR':
      if (!action.payload) {
        return initialState
      }
      else {
        return {
          ...state,
          productDetailsError: action.payload
        }
      }
    default:
      return state;
  }
};

export default productDetailsErrorReducer;