import { combineReducers } from 'redux';
import { accountsRecords } from './accounts';
import { syntheticAccountsRecords } from './syntheticAccounts';
import { subAccountsRecords } from './subAccounts';

export default combineReducers({
  accountsRecords,
  syntheticAccountsRecords,
  subAccountsRecords
});
