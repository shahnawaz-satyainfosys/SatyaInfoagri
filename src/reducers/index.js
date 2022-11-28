import loginReducer from './loginReducer';
import { combineReducers } from 'redux';
import resetPasswordReducer from './resetPasswordReducer';
import clientContactDetailsReducer from './clientContactDetailsReducer';

const rootReducer = combineReducers({
  loginReducer,
  resetPasswordReducer,
  clientContactDetailsReducer
});

export default rootReducer;