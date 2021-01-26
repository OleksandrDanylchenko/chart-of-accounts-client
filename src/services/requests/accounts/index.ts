import { IAccount } from '../../../models/accounts/IAccount';
import { callWebApi } from '../../fetch/apiAdapter';

export const fetchAccountsRequest = async (): Promise<{
  accounts: IAccount[];
}> => {
  const response = await callWebApi({
    endpoint: '/api/accounts',
    type: 'GET'
  });
  return response.json();
};
