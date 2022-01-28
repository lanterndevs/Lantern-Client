export type CryptoOrderStatus = 'completed' | 'pending' | 'failed';
export interface CryptoOrder {
  id: string;
  status: CryptoOrderStatus;
  orderDetails: string;
  orderDate: number;
  orderID: string;
  sourceName: string;
  sourceDesc: string;
  amountCrypto: number;
  amount: number;
  cryptoCurrency: string;
  currency: string;
}

export type TransactionCategory = 'expense';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: TransactionCategory;
}