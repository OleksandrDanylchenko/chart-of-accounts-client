import React, { FunctionComponent, useCallback, useState } from 'react';
import { ISyntheticAccount } from '../../models/syntheticAccounts/ISyntheticAccount';
import { Accordion } from 'semantic-ui-react';
import AccountTitle from '../Accounts/components/AccountTitle';
import SyntheticAccountDescription from './components/SytheticAccountDescription';
import { history } from '../../navigation/RouterConfig';

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
      const { index: id } = titleProps;

      const accountId = syntheticAccounts[0].accountId;

      let updatedOpenedSyntAccounts = [...openedSyntAccounts];
      if (openedSyntAccounts.includes(id)) {
        history.replace({ pathname: `/synthetic-accounts/${accountId}` });
        updatedOpenedSyntAccounts = updatedOpenedSyntAccounts.filter(
          (syntAccountIndex) => syntAccountIndex !== id
        );
      } else {
        history.replace({
          pathname: `/synthetic-accounts/${accountId}/${id}`
        });
        updatedOpenedSyntAccounts.push(id);
      }
      setOpenedSyntAccounts(updatedOpenedSyntAccounts);
    },
    [openedSyntAccounts, syntheticAccounts]
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
