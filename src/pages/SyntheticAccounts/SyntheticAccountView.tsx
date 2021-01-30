import React, { FunctionComponent } from 'react';

interface ISyntheticAccounts {
  syntheticAccount: number;
}

type SyntheticAccountProps = ISyntheticAccounts;

const SyntheticAccountView: FunctionComponent<SyntheticAccountProps> = (
  props
) => {
  const { syntheticAccount } = props;

  return <div>hfdh</div>;
};

export default SyntheticAccountView;
