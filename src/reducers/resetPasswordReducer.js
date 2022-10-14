const initialState = {
    newPassword: null
  };

const resetPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RESETPASSWORD':
      return{
        ...state,
        newPassword : action.payload
      }
    default:
      return state;
  }
};

export default resetPasswordReducer;