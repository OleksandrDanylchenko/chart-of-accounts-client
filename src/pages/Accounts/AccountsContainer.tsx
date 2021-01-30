import React, { FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';
import { IState } from '../../redux/state';
import { fetchAccountsRoutine } from '../../redux/routines';
import AccountsView from './AccountsView';
import ApiError from '../../navigation/ApiError/ApiError';

type AccountsContainerProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const AccountsContainer: FunctionComponent<AccountsContainerProps> = (
  props
) => {
  const { accounts, accountsRequestStatus, fetchAccounts } = props;

  useEffect(() => {
    if (accountsRequestStatus === 'idle') {
      fetchAccounts();
    }
  }, [accountsRequestStatus, fetchAccounts]);

  return (
    <div>
      {accounts?.length && <AccountsView accounts={accounts} />}
      {accountsRequestStatus === 'failed' && !accounts?.length && (
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
