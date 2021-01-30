import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IState } from '../../redux/state';
import { fetchAccountsRoutine } from '../../redux/routines';
import AccountsView from './AccountsView';
import ApiError from '../../navigation/ApiError/ApiError';
import { IAccount } from '../../models/accounts/IAccount';

type AccountsContainerProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const AccountsContainer: FunctionComponent<AccountsContainerProps> = (
  props
) => {
  const { accounts, accountsRequestStatus, fetchAccounts } = props;

  const [sortedAccounts, setSortedAccounts] = useState<IAccount[]>([]);

  useEffect(() => {
    if (accountsRequestStatus === 'idle') {
      fetchAccounts();
    }
  }, [accountsRequestStatus, fetchAccounts]);

  useEffect(() => {
    const sortedAccounts = accounts?.sort((a, b) => a.number - b.number);
    setSortedAccounts(sortedAccounts ?? []);
  }, [accounts]);

  return (
    <div>
      {sortedAccounts?.length && <AccountsView accounts={sortedAccounts} />}
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
