export interface ISyntheticAccount {
  id?: number;
  number: number;
  title: string;
  description: string;
  byDebitAccounts?: ISyntheticAccount[];
  byCreditAccounts?: ISyntheticAccount[];
  accountId: number;
}
