import React, { FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';
import { IState } from '../../redux/state';
import { fetchAccountsRoutine } from '../../redux/routines';
import AccountsView from './AccountsView';
import Loader from 'react-loader-spinner';
import ApiError from '../../navigation/ApiError/ApiError';

type AccountsContainerProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const AccountsContainer: FunctionComponent<AccountsContainerProps> = (
  props
) => {
  const { accounts, accountsRequestStatus, fetchAccounts } = props;

  useEffect(() => {
    if (!accounts && accountsRequestStatus === 'idle') {
      fetchAccounts();
    }
  }, [accounts, accountsRequestStatus, fetchAccounts]);

  return (
    <div>
      {accountsRequestStatus === 'loading' && (
        <Loader type={'TailSpin'} color={'black'} height={150} width={150} />
      )}
      {accountsRequestStatus === 'succeeded' && accounts && (
        <AccountsView accounts={accounts} />
      )}
      {accountsRequestStatus === 'failed' && !accounts && (
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

const mapDispatchToProps = () => ({
  fetchAccounts: fetchAccountsRoutine
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountsContainer);
