export type TransactionCategory = 'expense' | 'food' | 'uncategorized'; // need to remove this

export interface Transaction {
  transactionID: string;
  accountID: string;
  amount: number;
  category: string;
  date: Date;
  details: string;
  name: string;
  sourceName: string;
  sourceAccount: string;
  currency: string;
}