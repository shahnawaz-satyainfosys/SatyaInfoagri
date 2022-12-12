import loginReducer from './loginReducer';
import { combineReducers } from 'redux';
import resetPasswordReducer from './resetPasswordReducer';
import clientContactDetailsReducer from './clientContactDetailsReducer';
import updateClientContactDetailReducer from './updateClientContactDetailReducer';
import transactionDetailsReducer from './transactionDetailsReducer';
import clientDetailsReducer from './clientDetailsReducer';
import clientDetailsErrorReducer from './clientDetailsErrorReducer';
import contactDetailChangedReducer from './contactDetailChangedReducer'
import transactionDetailChangedReducer from './transactionDetailChangedReducer'

const rootReducer = combineReducers({
  loginReducer,
  resetPasswordReducer,
  clientContactDetailsReducer,
  updateClientContactDetailReducer,
  transactionDetailsReducer,
  clientDetailsReducer,
  clientDetailsErrorReducer,
  contactDetailChangedReducer,
  transactionDetailChangedReducer
});

export default rootReducer;