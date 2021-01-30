import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ISyntheticAccount } from '../../models/syntheticAccounts/ISyntheticAccount';
import { IState } from '../../redux/state';
import { fetchSyntheticAccountsRoutine } from '../../redux/routines';
import { Redirect, useParams } from 'react-router-dom';
import SyntheticAccountsView from './SyntheticAccountsView';

interface ISyntheticAccountsContainerParams {
  accountId?: string;
  id?: string;
}

interface ISyntheticAccountsContainer {
  accountId: number;
}

type SyntheticAccountsContainerProps = ISyntheticAccountsContainer &
  ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const SyntheticAccountsContainer: FunctionComponent<SyntheticAccountsContainerProps> = (
  props
) => {
  const {
    accountId: propsAccountId,
    syntheticAccounts,
    syntheticAccountsRequestStatus,
    fetchSyntheticAccounts
  } = props;

  const {
    accountId: paramsAccountId,
    id: openedSyntheticAccountId
  } = useParams<ISyntheticAccountsContainerParams>();
  const isAccountIdNumber = Number.isInteger(Number(paramsAccountId));

  const accountId = isAccountIdNumber ? paramsAccountId : propsAccountId;

  const [accountSyntheticAccounts, setAccountSyntheticAccounts] = useState<
    ISyntheticAccount[]
  >([]);

  useEffect(() => {
    if (syntheticAccountsRequestStatus === 'idle') {
      fetchSyntheticAccounts();
    }
  }, [fetchSyntheticAccounts, syntheticAccountsRequestStatus]);

  useEffect(() => {
    const accountSyntheticAccounts = syntheticAccounts
      ?.filter(
        (syntheticAccount) => syntheticAccount.accountId === Number(accountId)
      )
      .sort((a, b) => a.number - b.number);
    setAccountSyntheticAccounts(accountSyntheticAccounts ?? []);
  }, [accountId, syntheticAccounts]);

  return (
    <>
      {!isAccountIdNumber && accountId === undefined && (
        <Redirect to={{ pathname: '/accounts' }} />
      )}
      <SyntheticAccountsView
        syntheticAccounts={accountSyntheticAccounts}
        openedSyntheticAccountId={openedSyntheticAccountId}
      />
    </>
  );
};

const mapStateToProps = (state: IState) => ({
  syntheticAccounts: state.syntheticAccountsRecords.syntheticAccounts,
  syntheticAccountsRequestStatus:
    state.syntheticAccountsRecords.syntheticAccountRequestStatus,
  syntheticAccountsRequestError:
    state.syntheticAccountsRecords.syntheticAccountsRequestError
});

const mapDispatchToProps = {
  fetchSyntheticAccounts: fetchSyntheticAccountsRoutine
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SyntheticAccountsContainer);
