import { Card } from '@mui/material';
import {Transaction } from 'src/models/transaction';
import TransactionsTable from './TransactionsTable';
import {useEffect, useState } from 'react';
import axios from 'axios';
import { getCookie } from 'src/utilities/utils';

import {useDispatch, useSelector} from 'react-redux';
import {saveTransactions, setTransactionLoading} from '../../../redux/modules/transactions'
import {RootState} from '../../../redux/index'

const Transactions = () => {
  const dispatch = useDispatch();
  const transactionsState = useSelector((state: RootState) => state.transactions);
    // list of transactions fetched from Plaid API
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categoriesState, setCategoriesState] = useState<string[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  let accounts = new Map();
  let categoriesSet = new Set<string>();
  categoriesSet.add('All');

  const formatTransactions = () => {
    let tempTransactions: Transaction[] = [];
    transactionsState.transactions.forEach((transaction, key) => {
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
          sourceName: accounts.get(transaction.accountID),
          sourceAccount: '*****' + transaction.accountID.substring(transaction.accountID.length - 8),
          currency: 'USD',
        }
      );

      categoriesSet.add(transaction.categories[0]);
      setCategoriesState(Array.from(categoriesSet));
    });
    setTransactions(tempTransactions);
  }

  useEffect(()=>{
    formatTransactions();
  },[transactionsState])
  
  const fetchData = async () => {
    
    // retrieves accounts from the user
    await axios.get('http://localhost:8000/api/accounts', {
      headers: {
        authorization: 'Bearer ' + getCookie("auth_token"),
      }
    }).then((response) => {
      
      // stores the accounts in a map that will be used to link each transaction to respective account
      for(var account of response.data){
        accounts.set(account.id, account.name);
      }
    })
    
    // retrieves the transactions from the user
    if (transactionsState.loading) {
      axios.get('http://localhost:8000/api/transactions', {
        headers: {
          authorization: 'Bearer ' + getCookie("auth_token"),
        }
      }).then((response) => {
        setLoaded(true);
        dispatch(saveTransactions(response.data));
        dispatch(setTransactionLoading(false));
        // populates the accounts array with data from response
      })
    } else {
      setLoaded(true);
    }
    
  }

  // eslint-disable-next-line
  useEffect(() => { fetchData(); formatTransactions();}, []);
  
  return (
    <Card>
      <TransactionsTable transactions={transactions} categories={categoriesState} loaded={loaded}/>
    </Card>
  );
}

export default Transactions;