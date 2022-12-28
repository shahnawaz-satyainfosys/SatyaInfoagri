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
import companyDetailsReducer from './companyDetailsReducer'
import commonContactDetailsListReducer from './commonContactDetailsListReducer'
import companyDetailsErrorReducer from './companyDetailsErrorReducer'
import commonContactDetailsReducer from './commonContactDetailsReducer'
import commonContactDetailChangedReducer from './commonContactDetailChangedReducer'

const rootReducer = combineReducers({
  loginReducer,
  resetPasswordReducer,
  clientContactDetailsReducer,
  updateClientContactDetailReducer,
  transactionDetailsReducer,
  clientDetailsReducer,
  clientDetailsErrorReducer,
  contactDetailChangedReducer,
  transactionDetailChangedReducer,
  companyDetailsReducer,
  commonContactDetailsListReducer,
  companyDetailsErrorReducer,
  commonContactDetailsReducer,
  commonContactDetailChangedReducer
});

export default rootReducer;