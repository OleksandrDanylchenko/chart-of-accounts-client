import React, { FunctionComponent } from 'react';
import { IAccount } from '../../../models/accounts/IAccount';

interface IAccountTitle {
  account: IAccount;
}

type AccountTitleProps = IAccountTitle;

const AccountTitle: FunctionComponent<AccountTitleProps> = (props) => {
  const { account } = props;
  return (
    <>
      <h1>#{account.number}</h1>
      <h3>{account.title}</h3>
    </>
  );
};

export default AccountTitle;
