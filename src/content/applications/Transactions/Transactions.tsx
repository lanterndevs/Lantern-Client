import { Card } from '@mui/material';
import {Transaction } from 'src/models/transaction';
import TransactionsTable from './TransactionsTable';

function Transactions() {

  const transactions: Transaction[] = [
    {
      id: '1',
      details: 'Zelle Transfer',
      transactionDate: new Date().getTime(),
      category: 'expense',
      orderID: 'ZELLE G95BW4HR',
      sourceName: 'Bank of America',
      sourceDesc: '*** 1111',
      amount: 56787,
      currency: '$'
    },
    {
        id: '2',
        details: 'Expense',
        transactionDate: new Date().getTime(),
        category: 'uncategorized',
        orderID: 'MCDONALDS',
        sourceName: 'Bank Account',
        sourceDesc: '*** 1111',
        amount: 56787,
        currency: '$'
      },
      {
        id: '3',
        details: 'Incokme',
        transactionDate: new Date().getTime(),
        category: 'food',
        orderID: 'MCDONALDS',
        sourceName: 'Bank Account',
        sourceDesc: '*** 1111',
        amount: 56787,
        currency: '$'
      },
  ];

  return (
    <Card>
      <TransactionsTable transactions={transactions} />
    </Card>
  );
}

export default Transactions;
