import { Routine } from 'redux-saga-routines';
import { fetchAccountsRoutine } from '../../routines';
import { FetchingStatus } from '../../state';

import { ISubAccount } from '../../../models/subAccounts/ISubAccount';
import { subAccountsInitialState } from './initalState';

export interface ISubAccountsRecordsState {
  subAccounts?: ISubAccount[];
  subAccountsRequestStatus: FetchingStatus;
  subAccountsRequestError?: string;
}

export const subAccountsRecords = (
  state = subAccountsInitialState,
  action: Routine<any> // TODO Add typings for routines
): ISubAccountsRecordsState => {
  switch (action.type) {
    case fetchAccountsRoutine.TRIGGER:
      return {
        ...state,
        subAccountsRequestStatus: 'loading'
      };
    case fetchAccountsRoutine.SUCCESS: {
      return {
        ...state,
        subAccounts: action.payload,
        subAccountsRequestStatus: 'succeeded'
      };
    }
    case fetchAccountsRoutine.FAILURE:
      return {
        ...state,
        subAccountsRequestError: action.payload.toString(),
        subAccountsRequestStatus: 'failed'
      };
    case 'persist/REHYDRATE': {
      if (!action.payload?.subAccountsRecords) return { ...state };

      return {
        ...(action.payload.subAccountsRecords ?? subAccountsInitialState),
        accountsRequestStatus: 'idle'
      };
    }
    default:
      return state;
  }
};
