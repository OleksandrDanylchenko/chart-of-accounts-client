import { IAccount } from '../../../models/accounts/IAccount';
import { Routine } from 'redux-saga-routines';
import { fetchAccountsRoutine } from '../../routines';
import { FetchingStatus } from '../../state';

export interface IAccountsListState {
  accounts?: IAccount[];
  accountsRequestStatus: FetchingStatus;
  accountsRequestError?: string;
}

const initialState: IAccountsListState = {
  accounts: undefined,
  accountsRequestStatus: 'idle'
};

export const accountsRecords = (
  state = initialState,
  action: Routine<any> // TODO Add typings for routines
): IAccountsListState => {
  switch (action.type) {
    case fetchAccountsRoutine.TRIGGER:
      return {
        ...state,
        accountsRequestStatus: 'loading'
      };
    case fetchAccountsRoutine.SUCCESS:
      return {
        ...state,
        accounts: action.payload.accounts,
        accountsRequestStatus: 'succeeded'
      };
    case fetchAccountsRoutine.FAILURE:
      return {
        ...state,
        accountsRequestStatus: 'failed',
        accountsRequestError: action.payload.toString()
      };
    default:
      return state;
  }
};
