import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IState } from '../../../redux/state';
import { fetchSyntheticAccountsRoutine } from '../../../redux/routines';
import { ISyntheticAccount } from '../../../models/syntheticAccounts/ISyntheticAccount';

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
    accountId,
    syntheticAccounts,
    syntheticAccountsRequestStatus,
    fetchSyntheticAccounts
  } = props;

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
      ?.filter((syntheticAccount) => syntheticAccount.accountId === accountId)
      .sort((a, b) => a.number - b.number);
    setAccountSyntheticAccounts(accountSyntheticAccounts ?? []);
  }, [accountId, syntheticAccounts]);

  return <pre>{JSON.stringify(accountSyntheticAccounts, null, 2)}</pre>;
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
