import { Card } from '@mui/material';
import { CryptoOrder } from 'src/models/crypto_order';
import {Transaction } from 'src/models/transaction';
import RecentOrdersTable from './TransactionsTable';
import { subDays } from 'date-fns';
import TransactionsTable from './TransactionsTable';

function Transactions() {
  
  type TransactionCategory = 'expense' | 'food' | 'uncategorized';

  interface Transaction {
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

  // WILL NOT BE NEEDING THIS
  const cryptoOrders: CryptoOrder[] = [
    {
      id: '1',
      orderDetails: 'Fiat Deposit',
      orderDate: new Date().getTime(),
      status: 'completed',
      orderID: 'MCDONALDS',
      sourceName: 'Bank Account',
      sourceDesc: '*** 1111',
      amountCrypto: 34.4565,
      amount: 56787,
      cryptoCurrency: 'ETH',
      currency: '$'
    },
    {
      id: '2',
      orderDetails: 'Fiat Deposit',
      orderDate: subDays(new Date(), 1).getTime(),
      status: 'completed',
      orderID: 'WENDYS',
      sourceName: 'Bank Account',
      sourceDesc: '*** 1111',
      amountCrypto: 6.58454334,
      amount: 8734587,
      cryptoCurrency: 'BTC',
      currency: '$'
    },
    {
      id: '3',
      orderDetails: 'Fiat Deposit',
      orderDate: subDays(new Date(), 5).getTime(),
      status: 'failed',
      orderID: 'SUBWAY',
      sourceName: 'Bank Account',
      sourceDesc: '*** 1111',
      amountCrypto: 6.58454334,
      amount: 8734587,
      cryptoCurrency: 'BTC',
      currency: '$'
    },
    {
      id: '4',
      orderDetails: 'Fiat Deposit',
      orderDate: subDays(new Date(), 55).getTime(),
      status: 'completed',
      orderID: 'HOME DEPOT',
      sourceName: 'Bank Account',
      sourceDesc: '*** 1111',
      amountCrypto: 6.58454334,
      amount: 8734587,
      cryptoCurrency: 'BTC',
      currency: '$'
    },
    {
      id: '5',
      orderDetails: 'Fiat Deposit',
      orderDate: subDays(new Date(), 56).getTime(),
      status: 'pending',
      orderID: 'ROKU',
      sourceName: 'Bank Account',
      sourceDesc: '*** 1111',
      amountCrypto: 6.58454334,
      amount: 8734587,
      cryptoCurrency: 'BTC',
      currency: '$'
    },
    {
      id: '6',
      orderDetails: 'Fiat Deposit',
      orderDate: subDays(new Date(), 33).getTime(),
      status: 'completed',
      orderID: 'NIKE',
      sourceName: 'Bank Account',
      sourceDesc: '*** 1111',
      amountCrypto: 6.58454334,
      amount: 8734587,
      cryptoCurrency: 'BTC',
      currency: '$'
    },
    {
      id: '7',
      orderDetails: 'Fiat Deposit',
      orderDate: new Date().getTime(),
      status: 'pending',
      orderID: '479KUYHOBMJS',
      sourceName: 'Bank Account',
      sourceDesc: '*** 1212',
      amountCrypto: 2.346546,
      amount: 234234,
      cryptoCurrency: 'BTC',
      currency: '$'
    },
    {
      id: '8',
      orderDetails: 'Paypal Withdraw',
      orderDate: subDays(new Date(), 22).getTime(),
      status: 'completed',
      orderID: 'YAHOO',
      sourceName: 'Paypal Account',
      sourceDesc: '*** 1111',
      amountCrypto: 3.345456,
      amount: 34544,
      cryptoCurrency: 'BTC',
      currency: '$'
    },
    {
      id: '9',
      orderDetails: 'Fiat Deposit',
      orderDate: subDays(new Date(), 11).getTime(),
      status: 'completed',
      orderID: '63GJ5DJFKS4H',
      sourceName: 'Bank Account',
      sourceDesc: '*** 2222',
      amountCrypto: 1.4389567945,
      amount: 123843,
      cryptoCurrency: 'BTC',
      currency: '$'
    },
    {
      id: '10',
      orderDetails: 'Wallet Transfer',
      orderDate: subDays(new Date(), 123).getTime(),
      status: 'failed',
      orderID: '17KRZHY8T05M',
      sourceName: 'Wallet Transfer',
      sourceDesc: "John's Cardano Wallet",
      amountCrypto: 765.5695,
      amount: 7567,
      cryptoCurrency: 'ADA',
      currency: '$'
    }
  ];

  // THIS IS WHAT I WILL BE KEEPING
  const transactions: Transaction[] = [
    {
      id: '1',
      details: 'Fiat Deposit',
      transactionDate: new Date().getTime(),
      category: 'food',
      // going to need to name this something else from plaid
      orderID: 'MCDONALDS',
      sourceName: 'Bank Account',
      sourceDesc: '*** 1111',
      amount: 56787,
      currency: '$'
    },
    {
        id: '2',
        details: 'Expense',
        transactionDate: new Date().getTime(),
        category: 'food',
        // going to need to name this something else from plaid
        orderID: 'MCDONALDS',
        sourceName: 'Bank Account',
        sourceDesc: '*** 1111',
        amount: 56787,
        currency: '$'
      },
  ];

  return (
    <Card>
      <TransactionsTable cryptoOrders={cryptoOrders} />
      {/* <TransactionsTable transactions={transactions} /> */}
    </Card>
  );
}

export default Transactions;
