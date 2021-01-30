import React, { FunctionComponent } from 'react';
import { IAccount } from '../../../models/accounts/IAccount';

interface IAccountView {
  account: IAccount;
}

type AccountViewProps = IAccountView;

const AccountView: FunctionComponent<AccountViewProps> = (props) => {
  const { account } = props;
  return (
    <>
      <h1>#{account.number}</h1>
      <h3>{account.title}</h3>
      <h6>{account.description}</h6>
    </>
  );
};

export default AccountView;
