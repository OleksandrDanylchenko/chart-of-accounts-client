import { IAccount } from '../../../models/accounts/IAccount';
import { callWebApi } from '../../fetch/apiAdapter';

export const fetchAccountsRequest = async (): Promise<IAccount[]> => {
  const response = await callWebApi({
    endpoint: '/accounts',
    type: 'GET'
  });
  return response.json();
};
