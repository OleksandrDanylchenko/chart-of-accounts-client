import { IAccountsRecordsState } from './reducers/accounts';
import { ISyntheticAccountsRecordsState } from './reducers/syntheticAccounts';

export type FetchingStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface IState {
  accountsRecords: IAccountsRecordsState;
  syntheticAccountsRecords: ISyntheticAccountsRecordsState;
}
