import React, { FunctionComponent, useCallback, useState } from 'react';
import { IAccount } from '../../models/accounts/IAccount';
import { Accordion } from 'semantic-ui-react';
import AccountView from './components/AccountView';
import SyntheticAccountsContainer from './SyntheticAccounts/SyntheticAccountsContainer';

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
        <div key={account.id}>
          <Accordion.Title
            index={index}
            active={openedAccounts.includes(index)}
            onClick={handleClick}
          >
            <AccountView account={account} />
          </Accordion.Title>
          <Accordion.Content active={openedAccounts.includes(index)}>
            <>
              {openedAccounts.includes(index) && (
                <p>
                  <SyntheticAccountsContainer
                    accountId={account.id as number}
                  />
                </p>
              )}
            </>
          </Accordion.Content>
        </div>
      ))}
    </Accordion>
  );
};

export default AccountsView;
