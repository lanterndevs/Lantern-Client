import { Card } from '@mui/material';
import {Transaction } from 'src/models/transaction';
import TransactionsTable from './TransactionsTable';
import {useEffect, useState, useContext} from 'react';
import { number } from 'prop-types';
import axios from 'axios'
import { AuthenticationContext } from '../Login/authenticationContext';

const Transactions = () => {

  // need to update this, remove accounts, items, request_id, total_transactions
  const [plaidTransactions, setPlaidTransactions] = useState({
    
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
  
  
  const {authToken, setAuthToken } = useContext(AuthenticationContext); // the user authentication token
  // fetches user transactions via Plaid
  const fetchData = () => {
    console.log("REQ TRANSACTIONS");
    console.log(authToken);
    axios.get('http://localhost:8000/api/transactions', {
      headers: {
        authorization: 'Bearer ' + authToken,
      }
    }).then((response) => {
      // checks to see if the account data is as expected
      console.log(response);

    });
  }

  useEffect(() => {
    fetchData();
  }, [])

  let transactions: Transaction[] = [];

  return (
    <Card>
      <TransactionsTable transactions={transactions} />
    </Card>
  );
}

export default Transactions;
