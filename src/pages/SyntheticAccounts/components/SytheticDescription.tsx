import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { ISyntheticAccount } from '../../../models/syntheticAccounts/ISyntheticAccount';

interface ISyntheticAccountDescription {
  syntheticAccount: ISyntheticAccount;
}

type SyntheticAccountDescriptionProps = ISyntheticAccountDescription;

const SyntheticAccountDescription: FunctionComponent<SyntheticAccountDescriptionProps> = (
  props
) => {
  const { syntheticAccount } = props;
  return (
    <>
      <h4>{syntheticAccount.description}</h4>
      <Link to={`/sub-accounts/${syntheticAccount.id}`}>
        Sub accounts for synthetic account
      </Link>
    </>
  );
};

export default SyntheticAccountDescription;
