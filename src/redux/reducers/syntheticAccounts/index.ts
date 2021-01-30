import { Routine } from 'redux-saga-routines';
import { FetchingStatus } from '../../state';
import { ISyntheticAccount } from '../../../models/syntheticAccounts/ISyntheticAccount';
import { syntheticAccountsInitialState } from './initialState';
import { fetchSyntheticAccountsRoutine } from '../../routines';

export interface ISyntheticAccountsRecordsState {
  syntheticAccounts?: ISyntheticAccount[];
  syntheticAccountRequestStatus: FetchingStatus;
  syntheticAccountsRequestError?: string;
}

export const syntheticAccountsRecords = (
  state = syntheticAccountsInitialState,
  action: Routine<any> // TODO Add typings for routines
): ISyntheticAccountsRecordsState => {
  switch (action.type) {
    case fetchSyntheticAccountsRoutine.TRIGGER:
      return {
        ...state,
        syntheticAccountRequestStatus: 'loading'
      };
    case fetchSyntheticAccountsRoutine.SUCCESS: {
      return {
        ...state,
        syntheticAccounts: action.payload,
        syntheticAccountRequestStatus: 'succeeded'
      };
    }
    case fetchSyntheticAccountsRoutine.FAILURE:
      return {
        ...state,
        syntheticAccountsRequestError: action.payload.toString(),
        syntheticAccountRequestStatus: 'failed'
      };
    default:
      return state;
  }
};
