import React, { FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';
import { IAccount } from '../../../models/accounts/IAccount';
import { IState } from '../../../redux/state';

interface ISyntheticAccountsContainer {
  accountId: number;
}

type SyntheticAccountsContainerProps = ISyntheticAccountsContainer &
  ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const SyntheticAccountsContainer: FunctionComponent<SyntheticAccountsContainerProps> = (
  props
) => {
  return <div>{props.accountId}</div>;
};

const mapStateToProps = (state: IState) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SyntheticAccountsContainer);
