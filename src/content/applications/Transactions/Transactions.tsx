import { Card } from '@mui/material';
import { Transaction } from 'src/models/transaction';
import TransactionsTable from './TransactionsTable';
import { useEffect, useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import { getCookie } from 'src/utils/cookies';

import { useDispatch, useSelector } from 'react-redux';
import {
  saveTransactions,
  setTransactionLoading
} from '../../../redux/modules/transactions';
import { RootState } from '../../../redux/index';

const Transactions = () => {
  const dispatch = useDispatch();
  const transactionsState = useSelector(
    (state: RootState) => state.transactions
  );
  // list of transactions fetched from Plaid API
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categoriesState, setCategoriesState] = useState<string[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  let accounts = useMemo(() => new Map(), []);
  let categoriesSet = useMemo(() => new Set<string>(), []);
  categoriesSet.add('All');

  const formatTransactions = useCallback(() => {
    let tempTransactions: Transaction[] = [];
    transactionsState.transactions.forEach((transaction, key) => {
      // pushes all fetched transactions to temp transactions array
      tempTransactions.push({
        transactionID: key.toString(),
        accountID: transaction.accountID,
        amount: transaction.amount,
        category: transaction.categories[0],
        date: transaction.date,
        details: transaction.details,
        name: transaction.name,
        sourceName: accounts.get(transaction.accountID),
        sourceAccount:
          '*****' +
          transaction.accountID.substring(transaction.accountID.length - 8),
        currency: 'USD'
      });

      categoriesSet.add(transaction.categories[0]);
      setCategoriesState(Array.from(categoriesSet));
    });
    setTransactions(tempTransactions);
  }, [accounts, categoriesSet, transactionsState.transactions]);

  useEffect(() => {
    formatTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionsState]);

  const fetchData = async () => {
    // retrieves accounts from the user
    await axios
      .get('http://localhost:8000/api/accounts', {
        headers: {
          authorization: 'Bearer ' + getCookie('auth_token')
        }
      })
      .then((response) => {
        // stores the accounts in a map that will be used to link each transaction to respective account
        for (var account of response.data) {
          accounts.set(account.id, account.name);
        }
      });

    // retrieves the transactions from the user
    if (transactionsState.loading) {
      let plaidTransactions = [];
      let totalTransactions = 1;
      while (plaidTransactions.length < totalTransactions) {
        // retrieves the transactions from the user (PAGINATED)
        let response = await axios.get(
          'http://localhost:8000/api/transactions',
          {
            headers: {
              authorization: 'Bearer ' + getCookie('auth_token')
            },
            params: {
              offset: plaidTransactions.length
            }
          }
        );

        totalTransactions = response.data.total_transactions;
        response.data.transactions.forEach((transaction, key) => {
          plaidTransactions.push(transaction);
        });
        setLoaded(true);
        console.log(plaidTransactions);
        dispatch(saveTransactions(plaidTransactions));
        dispatch(setTransactionLoading(false));
      }
    } else {
      setLoaded(true);
    }
  };

  // eslint-disable-next-line
  useEffect(() => { fetchData(); formatTransactions();}, []);

  return (
    <Card>
      <TransactionsTable
        transactions={transactions}
        categories={categoriesState}
        loaded={loaded}
      />
    </Card>
  );
};

export default Transactions;
