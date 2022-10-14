import loginReducer from './loginReducer';
import { combineReducers } from 'redux';
import resetPasswordReducer from './resetPasswordReducer';

const rootReducer = combineReducers({
  loginReducer,
  resetPasswordReducer
});

export default rootReducer;