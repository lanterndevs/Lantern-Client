import { Card } from '@mui/material';
import {Transaction } from 'src/models/transaction';
import TransactionsTable from './TransactionsTable';
import {useEffect, useState} from 'react';
import { number } from 'prop-types';

const Transactions = () => {

  const [plaidTransactions, setPlaidTransactions] = useState({
    account: "",
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
  
  // fetches the transactions
  const fetchData = () => {
    fetch("/transactions")
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

  if(plaidTransactions){

    for(var transaction of plaidTransactions.transactions){

      console.log(transaction.date);

      transactions.push(
        {id: transaction.transaction_id, 
        details: transaction.name, 
        transactionDate: new Date(transaction.date), 
        category: 'expense', 
        orderID: 'ZELLE G95BW4HR',
        sourceName: 'Bank of America',
        sourceDesc: '*** 1111',
        amount: Number(transaction.amount),
        currency: '$'}
      )
    }
  }

  return (
    <Card>
      <TransactionsTable transactions={transactions} />
    </Card>
  );
}

export default Transactions;
