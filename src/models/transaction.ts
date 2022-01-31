export type TransactionCategory = 'expense' | 'food' | 'uncategorized';

export interface Transaction {
  id: string;
  details: string;
  transactionDate: number;
  orderID: string;
  amount: number;
  category: TransactionCategory;
  sourceName: string;
  sourceDesc: string;
  currency: string;
}