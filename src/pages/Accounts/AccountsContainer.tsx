import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IState } from '../../redux/state';
import { fetchAccountsRoutine } from '../../redux/routines';
import AccountsView from './AccountsView';
import ApiError from '../../navigation/ApiError/ApiError';
import { IAccount } from '../../models/accounts/IAccount';
import { useParams } from 'react-router-dom';

interface IAccountsContainerParams {
  id?: string;
}

type AccountsContainerProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const AccountsContainer: FunctionComponent<AccountsContainerProps> = (
  props
) => {
  const { accounts, accountsRequestStatus, fetchAccounts } = props;
  const [sortedAccounts, setSortedAccounts] = useState<IAccount[]>([]);

  const { id } = useParams<IAccountsContainerParams>();

  useEffect(() => {
    if (accountsRequestStatus === 'idle') {
      fetchAccounts();
    }
  }, [accountsRequestStatus, fetchAccounts]);

  useEffect(() => {
    const sortedAccounts = accounts?.sort((a, b) => a.number - b.number);
    setSortedAccounts(sortedAccounts ?? []);
  }, [accounts, accountsRequestStatus]);

  return (
    <div>
      {sortedAccounts?.length > 0 && (
        <AccountsView accounts={sortedAccounts} openedAccountId={id} />
      )}
      {accountsRequestStatus === 'failed' && !sortedAccounts?.length && (
        <ApiError apiType={'accounts'} />
      )}
    </div>
  );
};

const mapStateToProps = (state: IState) => ({
  accounts: state.accountsRecords.accounts,
  accountsRequestStatus: state.accountsRecords.accountsRequestStatus,
  accountsRequestError: state.accountsRecords.accountsRequestError
});

const mapDispatchToProps = {
  fetchAccounts: fetchAccountsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountsContainer);
