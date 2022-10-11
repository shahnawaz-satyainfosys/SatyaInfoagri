  const initialState = {
    user: []
  };

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return{
        ...state,
        user : action.payload
      }
    default:
      return state;
  }
};

export default loginReducer;