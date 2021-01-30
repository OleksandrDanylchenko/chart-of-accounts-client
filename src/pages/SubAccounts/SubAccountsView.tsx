import React, { FunctionComponent, useCallback, useState } from 'react';
import { Accordion } from 'semantic-ui-react';
import { ISubAccount } from '../../models/subAccounts/ISubAccount';
import AccountTitle from '../Accounts/components/AccountTitle';
import SubAccountDescription from './components/SubAccountDescription';

interface ISubAccounts {
  subAccounts: ISubAccount[];
  openedSubAccountId?: string;
}

type SyntheticAccountProps = ISubAccounts;

const SubAccountsView: FunctionComponent<SyntheticAccountProps> = (props) => {
  const { subAccounts, openedSubAccountId } = props;

  const isOpenedSubAccountIdNumber = Number.isInteger(
    Number(openedSubAccountId)
  );
  const [openedSubAccounts, setOpenedSubAccounts] = useState<number[]>(
    isOpenedSubAccountIdNumber ? [Number(openedSubAccountId)] : []
  );

  const handleClick = useCallback(
    (_, titleProps) => {
      const { index } = titleProps;

      let updatedOpenedSubAccounts = [...openedSubAccounts];
      if (openedSubAccounts.includes(index)) {
        updatedOpenedSubAccounts = updatedOpenedSubAccounts.filter(
          (syntAccountIndex) => syntAccountIndex !== index
        );
      } else {
        updatedOpenedSubAccounts.push(index);
      }
      setOpenedSubAccounts(updatedOpenedSubAccounts);
    },
    [openedSubAccounts]
  );

  return (
    <Accordion>
      {subAccounts.map((subAccount) => (
        <div key={subAccount.id}>
          <Accordion.Title
            index={subAccount.id}
            active={openedSubAccounts.includes(subAccount.id as number)}
            onClick={handleClick}
          >
            <AccountTitle account={subAccount} />
          </Accordion.Title>
          <Accordion.Content
            active={openedSubAccounts.includes(subAccount.id as number)}
          >
            <SubAccountDescription subAccount={subAccount} />
          </Accordion.Content>
        </div>
      ))}
    </Accordion>
  );
};

export default SubAccountsView;
