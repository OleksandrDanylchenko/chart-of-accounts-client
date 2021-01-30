import React, { FunctionComponent, useCallback, useState } from 'react';
import { IAccount } from '../../models/accounts/IAccount';
import { Accordion } from 'semantic-ui-react';
import AccountView from './components/AccountView';

interface IAccountsView {
  accounts: IAccount[];
  openedAccountId?: string;
}

type AccountsViewProps = IAccountsView;

const AccountsView: FunctionComponent<AccountsViewProps> = (props) => {
  const { accounts, openedAccountId } = props;

  const isOpenedAccountIdNumber =
    openedAccountId !== undefined && Number.isInteger(Number(openedAccountId));
  const [openedAccounts, setOpenedAccounts] = useState<number[]>(
    isOpenedAccountIdNumber ? [Number(openedAccountId)] : []
  );

  const handleClick = useCallback(
    (_, titleProps) => {
      const { index } = titleProps;

      let updatedOpenedAccounts = [...openedAccounts];
      if (openedAccounts.includes(index)) {
        updatedOpenedAccounts = updatedOpenedAccounts.filter(
          (accountIndex) => accountIndex !== index
        );
      } else {
        updatedOpenedAccounts.push(index);
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
            <AccountView account={account} />
          </Accordion.Title>
          <Accordion.Content
            active={openedAccounts.includes(account.id as number)}
          >
            <p>Text</p>
          </Accordion.Content>
        </div>
      ))}
    </Accordion>
  );
};

export default AccountsView;
