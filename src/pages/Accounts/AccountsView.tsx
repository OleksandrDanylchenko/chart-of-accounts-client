import React, { FunctionComponent } from 'react';
import { IAccount } from '../../models/accounts/IAccount';

interface IAccountsView {
  accounts: IAccount[];
}

type AccountsViewProps = IAccountsView;

const AccountsView: FunctionComponent<AccountsViewProps> = (props) => {
  const { accounts } = props;

  return (
    <ul>
      {accounts.map((account) => (
        <li key={account.id}>{account.title}</li>
      ))}
    </ul>
  );
};

export default AccountsView;
