import { IAccountsRecordsState } from './reducers/accounts';
import { ISyntheticAccountsRecordsState } from './reducers/syntheticAccounts';
import { ISubAccountsRecordsState } from './reducers/subAccounts';

export type FetchingStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface IState {
  accountsRecords: IAccountsRecordsState;
  syntheticAccountsRecords: ISyntheticAccountsRecordsState;
  subAccountsRecords: ISubAccountsRecordsState;
}
