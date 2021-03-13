import React, { FunctionComponent } from 'react';
import { ISubAccount } from '../../../models/subAccounts/ISubAccount';

interface ISubAccountDescription {
  subAccount: ISubAccount;
}

type SubAccountDescriptionProps = ISubAccountDescription;

const SubAccountDescription: FunctionComponent<SubAccountDescriptionProps> = (
  props
) => {
  const { subAccount } = props;
  return (
    <>
      <h4>{subAccount.description}</h4>
    </>
  );
};

export default SubAccountDescription;
