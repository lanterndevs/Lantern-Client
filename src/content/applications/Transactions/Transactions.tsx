import { Card } from '@mui/material';
import {Transaction } from 'src/models/transaction';
import TransactionsTable from './TransactionsTable';
import {useEffect, useState} from 'react';
import { number } from 'prop-types';

const Transactions = () => {

  const [plaidTransactions, setPlaidTransactions] = useState({
    accounts: [
      {
        account_id: "",
        balances: [],
        mask: "",
        name: "",
        official_name: "",
        subtype: "",
        type: "",
      }
    ],

    item: "",
    request_id: "",
    total_transactions:"",
    
    transactions: [
      {
        account_id: "",
        account_owner: "",
        amount: "",
        category: [],
        category_id: number,
        date: "",
        iso_currency_code: "",
        location: "",
        name: "",
        payment_meta: "",
        pending: "",
        pending_transaction_id: "",
        transaction_id: "",
        transaction_type: "",
        unofficial_currency_code: null
      }
    ],
  })
  
  // fetches user transactions via Plaid
  const fetchData = () => {
    fetch("http://localhost:3001/transactions")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setPlaidTransactions(data)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  let transactions: Transaction[] = [];
  let categoriesSet = new Set<string>();

  console.log(plaidTransactions);

  // if the user has transctions retrieved from Plaid, populate the transcations table
  if(plaidTransactions.transactions[0].name !== ""){

    // creates a map to accounts to retrive name based on account_id
    let accounts = new Map();
    for(var account of plaidTransactions.accounts){
      accounts.set(account.account_id, [account.name, account.subtype]);
    }

    // appends new transactions to list of transactions
    for(var transaction of plaidTransactions.transactions){
      transactions.push(
        {id: transaction.transaction_id, 
        details: transaction.name, 
        transactionDate: new Date(transaction.date), 
        category: transaction.category[0], 
        orderID: 'ZELLE G95BW4HR',
        sourceName: accounts.get(transaction.account_id)[0],
        sourceDesc: accounts.get(transaction.account_id)[1],
        amount: Number(transaction.amount),
        currency: '$'}
      );
      categoriesSet.add(transaction.category[0]);
    }
  }
  let categories = Array.from(categoriesSet);
  return (
    <Card>
      <TransactionsTable transactions={transactions} categories={categories} />
    </Card>
  );
}

export default Transactions;
