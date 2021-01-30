import React, { FunctionComponent, useCallback, useState } from 'react';
import { IAccount } from '../../models/accounts/IAccount';
import { Accordion, Icon } from 'semantic-ui-react';
import AccountView from './components/AccountView';

interface IAccountsView {
  accounts: IAccount[];
}

type AccountsViewProps = IAccountsView;

const AccountsView: FunctionComponent<AccountsViewProps> = (props) => {
  const { accounts } = props;

  const [openedAccounts, setOpenedAccounts] = useState<number[]>([]);

  const handleClick = useCallback(
    (_, titleProps) => {
      const { index } = titleProps;

      let updatedOpenedAccounts = [...openedAccounts];
      if (openedAccounts.includes(index)) {
        updatedOpenedAccounts = updatedOpenedAccounts.filter(
          (accountIndex) => accountIndex !== index
        );
      } else {
        updatedOpenedAccounts.push(index);
      }
      setOpenedAccounts(updatedOpenedAccounts);
    },
    [openedAccounts]
  );

  return (
    <Accordion>
      {accounts.map((account, index) => (
        <>
          <Accordion.Title
            index={index}
            active={openedAccounts.includes(index)}
            onClick={handleClick}
          >
            <AccountView account={account} />
          </Accordion.Title>
          <Accordion.Content active={openedAccounts.includes(index)}>
            <p>
              A dog is a type of domesticated animal. Known for its loyalty and
              faithfulness, it can be found as a welcome guest in many
              households across the world.
            </p>
          </Accordion.Content>
        </>
      ))}
    </Accordion>
  );
};

export default AccountsView;
