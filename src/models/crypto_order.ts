
// THIS FILE NEEDS TO BE RENAMED
// THIS INTERFACE AND TYPE NEED TO BE REMOVED
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

