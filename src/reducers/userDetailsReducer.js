const initialState = {
  userDetails: {}
};

const userDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USERDETAILS':
      if(!action.payload) {
        return initialState
      }
      else{
        return{
          ...state,
          userDetails : action.payload
        }
      }
    default:
      return state;
  }
};

export default userDetailsReducer;