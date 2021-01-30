import React, { FunctionComponent, useCallback, useState } from 'react';
import { IAccount } from '../../models/accounts/IAccount';
import { Accordion } from 'semantic-ui-react';
import AccountTitle from './components/AccountTitle';
import AccountDescription from './components/AccountDescription';
import { history } from '../../navigation/RouterConfig';

interface IAccountsView {
  accounts: IAccount[];
  openedAccountId?: string;
}

type AccountsViewProps = IAccountsView;

const AccountsView: FunctionComponent<AccountsViewProps> = (props) => {
  const { accounts, openedAccountId } = props;

  const isOpenedAccountIdNumber = Number.isInteger(Number(openedAccountId));
  const [openedAccounts, setOpenedAccounts] = useState<number[]>(
    isOpenedAccountIdNumber ? [Number(openedAccountId)] : []
  );

  const handleClick = useCallback(
    (_, titleProps) => {
      const { index: id } = titleProps;

      let updatedOpenedAccounts = [...openedAccounts];
      if (openedAccounts.includes(id)) {
        history.replace({ pathname: '/accounts' });
        updatedOpenedAccounts = updatedOpenedAccounts.filter(
          (accountIndex) => accountIndex !== id
        );
      } else {
        history.replace({ pathname: `/accounts/${id}` });
        updatedOpenedAccounts.push(id);
      }
      setOpenedAccounts(updatedOpenedAccounts);
    },
    [openedAccounts]
  );

  return (
    <Accordion>
      {accounts.map((account) => (
        <div key={account.id}>
          <Accordion.Title
            index={account.id}
            active={openedAccounts.includes(account.id as number)}
            onClick={handleClick}
          >
            <AccountTitle account={account} />
          </Accordion.Title>
          <Accordion.Content
            active={openedAccounts.includes(account.id as number)}
          >
            <AccountDescription account={account} />
          </Accordion.Content>
        </div>
      ))}
    </Accordion>
  );
};

export default AccountsView;
