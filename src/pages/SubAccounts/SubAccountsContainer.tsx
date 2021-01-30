import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IState } from '../../redux/state';
import { fetchSubAccountsRoutine } from '../../redux/routines';
import { Redirect, useParams } from 'react-router-dom';
import { ISubAccount } from '../../models/subAccounts/ISubAccount';
import SubAccountsView from './SubAccountsView';
import ApiError from '../../navigation/ApiError/ApiError';

interface ISubAccountsContainerParams {
  syntheticAccountId?: string;
  id?: string;
}

interface ISubAccountsContainer {
  syntheticAccountId: number;
}

type SyntheticAccountsContainerProps = ISubAccountsContainer &
  ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const SyntheticAccountsContainer: FunctionComponent<SyntheticAccountsContainerProps> = (
  props
) => {
  const {
    syntheticAccountId: propsSyntheticAccountId,
    subAccounts,
    subAccountsRequestStatus,
    fetchSubAccounts
  } = props;

  const {
    syntheticAccountId: paramsSyntheticAccountId,
    id: openedSubAccountId
  } = useParams<ISubAccountsContainerParams>();
  const isAccountIdNumber = Number.isInteger(Number(paramsSyntheticAccountId));

  const syntheticAccountId = isAccountIdNumber
    ? paramsSyntheticAccountId
    : propsSyntheticAccountId;

  const [syntAccountSubAccounts, setSyntAccountSubAccounts] = useState<
    ISubAccount[]
  >([]);

  useEffect(() => {
    if (subAccountsRequestStatus === 'idle') {
      fetchSubAccounts();
    }
  }, [fetchSubAccounts, subAccountsRequestStatus]);

  useEffect(() => {
    const syntheticAccountSubAccounts = subAccounts
      ?.filter(
        (subAccount) =>
          subAccount.syntheticAccountId === Number(syntheticAccountId)
      )
      .sort((a, b) => a.number - b.number);
    setSyntAccountSubAccounts(syntheticAccountSubAccounts ?? []);
  }, [subAccounts, syntheticAccountId]);

  return (
    <>
      {!isAccountIdNumber && syntheticAccountId === undefined && (
        <Redirect to={{ pathname: '/accounts' }} />
      )}
      {subAccountsRequestStatus === 'failed' &&
        !syntAccountSubAccounts?.length && <ApiError apiType={'subAccounts'} />}
      <SubAccountsView
        subAccounts={syntAccountSubAccounts}
        openedSubAccountId={openedSubAccountId}
      />
    </>
  );
};

const mapStateToProps = (state: IState) => ({
  subAccounts: state.subAccountsRecords.subAccounts,
  subAccountsRequestStatus: state.subAccountsRecords.subAccountsRequestStatus,
  subAccountsRequestError: state.subAccountsRecords.subAccountsRequestError
});

const mapDispatchToProps = {
  fetchSubAccounts: fetchSubAccountsRoutine
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SyntheticAccountsContainer);
