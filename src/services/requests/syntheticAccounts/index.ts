import { callWebApi } from '../../fetch/apiAdapter';
import { ISyntheticAccount } from '../../../models/syntheticAccounts/ISyntheticAccount';

export const fetchSyntheticAccountsRequest = async (): Promise<
  ISyntheticAccount[]
> => {
  const response = await callWebApi({
    endpoint: '/synthetic-accounts/with-linked',
    type: 'GET'
  });
  return response.json();
};
