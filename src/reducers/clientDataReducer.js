const initialState = {
  clientData: {}
};

const clientDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CLIENTDATA':
      if(!action.payload) {
        return initialState
      }
      else{
        return{
          ...state,
          clientData : action.payload
        }
      }
    default:
      return state;
  }
};

export default clientDataReducer;