export type TransactionCategory = 'expense' | 'food' | 'uncategorized';

export interface Transaction {
  id: string;
  details: string;
  transactionDate: Date;
  orderID: string;
  amount: number;
  category: TransactionCategory;
  sourceName: string;
  sourceDesc: string;
  currency: string;
}