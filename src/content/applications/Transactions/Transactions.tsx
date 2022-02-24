import { Card } from '@mui/material';
import {Transaction } from 'src/models/transaction';
import TransactionsTable from './TransactionsTable';
import {useEffect } from 'react';
import axios from 'axios';
import { getCookie } from 'src/utilities/utils';

const Transactions = () => {
  
  // list of transactions fetched from Plaid API
  let transactions: Transaction[] = [
    {
      id: 'Tosin',
      details: 'Tosin',
      transactionDate: new Date(),
      orderID: 'Tosin',
      amount: 3224,
      category: 'expense',
      sourceName: 'Tosin',
      sourceDesc: 'Tosin',
      currency: '$',
    }
  ];
  
  // fetches user transactions via Plaid
  const fetchData = () => {
    
    // makes GET request to retrived user transactions
    axios.get('http://localhost:8000/api/transactions', {
      headers: {
        authorization: 'Bearer ' + getCookie("auth_token"),
      }
    }).then((response) => {
      // checks to see if the account data is as expected
      console.log(response);
    });
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <Card>
      <TransactionsTable transactions={transactions} />
    </Card>
  );
}

export default Transactions;
