import { combineReducers } from 'redux';
import { accountsRecords } from './accounts';
import { syntheticAccountsRecords } from './syntheticAccounts';

export default combineReducers({ accountsRecords, syntheticAccountsRecords });
