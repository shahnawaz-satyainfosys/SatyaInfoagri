const initialState = {
  clientContactList: []
};

const clientContactListReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CLIENTCONTACTLIST':
      if(!action.payload) {
        return initialState
      }
      else{
        return{
          ...state,
          clientContactList : action.payload
        }
      }
    default:
      return state;
  }
};

export default clientContactListReducer;