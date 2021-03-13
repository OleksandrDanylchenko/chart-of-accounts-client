import { callWebApi } from '../../fetch/apiAdapter';
import { ISubAccount } from '../../../models/subAccounts/ISubAccount';

export const fetchSubAccountsRequest = async (): Promise<ISubAccount[]> => {
  const response = await callWebApi({
    endpoint: '/sub-accounts',
    type: 'GET'
  });
  return response.json();
};
