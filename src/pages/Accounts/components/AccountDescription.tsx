import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { IAccount } from '../../../models/accounts/IAccount';

interface IAccountDescription {
  account: IAccount;
}

type AccountDescriptionProps = IAccountDescription;

const AccountDescription: FunctionComponent<AccountDescriptionProps> = (
  props
) => {
  const { account } = props;
  return (
    <>
      <h4>{account.description}</h4>
      <Link to={`/synthetic-accounts/${account.id}`}>
        Synthetic accounts for account
      </Link>
    </>
  );
};

export default AccountDescription;
