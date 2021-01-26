import { IAccountsListState } from './reducers/accounts';

export type FetchingStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface IState {
  accountsRecords: IAccountsListState;
}
