import React, { FunctionComponent, useCallback, useState } from 'react';
import { ISyntheticAccount } from '../../models/syntheticAccounts/ISyntheticAccount';
import { Accordion } from 'semantic-ui-react';
import AccountTitle from '../Accounts/components/AccountTitle';
import SyntheticAccountDescription from './components/SytheticAccountDescription';

interface ISyntheticAccounts {
  syntheticAccounts: ISyntheticAccount[];
  openedSyntheticAccountId?: string;
}

type SyntheticAccountProps = ISyntheticAccounts;

const SyntheticAccountsView: FunctionComponent<SyntheticAccountProps> = (
  props
) => {
  const { syntheticAccounts, openedSyntheticAccountId } = props;

  const isOpenedSyntAccountIdNumber = Number.isInteger(
    Number(openedSyntheticAccountId)
  );
  const [openedSyntAccounts, setOpenedSyntAccounts] = useState<number[]>(
    isOpenedSyntAccountIdNumber ? [Number(openedSyntheticAccountId)] : []
  );

  const handleClick = useCallback(
    (_, titleProps) => {
      const { index } = titleProps;

      let updatedOpenedSyntAccounts = [...openedSyntAccounts];
      if (openedSyntAccounts.includes(index)) {
        updatedOpenedSyntAccounts = updatedOpenedSyntAccounts.filter(
          (syntAccountIndex) => syntAccountIndex !== index
        );
      } else {
        updatedOpenedSyntAccounts.push(index);
      }
      setOpenedSyntAccounts(updatedOpenedSyntAccounts);
    },
    [openedSyntAccounts]
  );

  return (
    <Accordion>
      {syntheticAccounts.map((syntheticAccount) => (
        <div key={syntheticAccount.id}>
          <Accordion.Title
            index={syntheticAccount.id}
            active={openedSyntAccounts.includes(syntheticAccount.id as number)}
            onClick={handleClick}
          >
            <AccountTitle account={syntheticAccount} />
          </Accordion.Title>
          <Accordion.Content
            active={openedSyntAccounts.includes(syntheticAccount.id as number)}
          >
            <SyntheticAccountDescription syntheticAccount={syntheticAccount} />
          </Accordion.Content>
        </div>
      ))}
    </Accordion>
  );
};

export default SyntheticAccountsView;
