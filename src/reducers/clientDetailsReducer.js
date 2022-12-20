const initialState = {
  clientDetails: {}
};

const clientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CLIENTDETAILS':
      if(!action.payload) {
        return initialState
      }
      else{
        return{
          ...state,
          clientDetails : action.payload
        }
      }
    default:
      return state;
  }
};

export default clientDetailsReducer;