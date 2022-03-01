import { Card } from '@mui/material';
import {Transaction } from 'src/models/transaction';
import TransactionsTable from './TransactionsTable';
import {useEffect, useState } from 'react';
import axios from 'axios';
import { getCookie } from 'src/utilities/utils';

const Transactions = () => {

    // list of transactions fetched from Plaid API
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categoriesState, setCategoriesState] = useState<string[]>([]);
  let categoriesSet = new Set<string>();
  categoriesSet.add('All');

  // fetches user transactions via Plaid
  const fetchData = () => {
    axios.get('http://localhost:8000/api/transactions', {
        headers: {
          authorization: 'Bearer ' + getCookie("auth_token"),
        }
      }).then((response) => {

        console.log(response.data)
        // also need to get the list of accounts to map transactions
        // use the map to link the source name and sourceDescription

        // populates the accounts array with data from response
        let tempTransactions: Transaction[] = [];
        
        response.data.forEach((transaction, key) => {
          
          // pushes all fetched transactions to temp transactions array
          tempTransactions.push(
            { 
              transactionID: key.toString(),
              accountID: transaction.accountID,
              amount: transaction.amount,
              category: transaction.categories[0],
              date: transaction.date, 
              details: transaction.details,
              name: transaction.name,
              sourceName: 'Tosin', // name of the bank goes here
              sourceAccount: 'Tosin', // name of account goes here (Checking, Savings, etc)
              currency: 'USD',
            }
          );
          categoriesSet.add(transaction.categories[0]);
          setCategoriesState(Array.from(categoriesSet));
        });
        setTransactions(tempTransactions);
      })
  }

  // eslint-disable-next-line
  useEffect(() => { fetchData(); }, []);
  
  return (
    <Card>
      <TransactionsTable transactions={transactions} categories={categoriesState}/>
    </Card>
  );
}

export default Transactions;