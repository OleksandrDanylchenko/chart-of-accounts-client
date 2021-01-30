import React, { FunctionComponent, useCallback, useState } from 'react';
import { Accordion } from 'semantic-ui-react';
import { ISubAccount } from '../../models/subAccounts/ISubAccount';
import AccountTitle from '../Accounts/components/AccountTitle';
import SubAccountDescription from './components/SubAccountDescription';
import { history } from '../../navigation/RouterConfig';

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
      const { index: id } = titleProps;

      const syntheticAccountId = subAccounts[0].syntheticAccountId;

      let updatedOpenedSubAccounts = [...openedSubAccounts];
      if (openedSubAccounts.includes(id)) {
        history.replace({ pathname: `/sub-accounts/${syntheticAccountId}` });
        updatedOpenedSubAccounts = updatedOpenedSubAccounts.filter(
          (syntAccountIndex) => syntAccountIndex !== id
        );
      } else {
        history.replace({
          pathname: `/sub-accounts/${syntheticAccountId}/${id}`
        });
        updatedOpenedSubAccounts.push(id);
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
