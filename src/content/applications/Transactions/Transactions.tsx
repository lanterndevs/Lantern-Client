import { Card } from '@mui/material';
import { Transaction } from 'src/models/transaction';
import TransactionsTable from './TransactionsTable';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getCookie } from 'src/utils/cookies';

const Transactions = () => {
  // list of transactions fetched from Plaid API
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categoriesState, setCategoriesState] = useState<string[]>([]);
  let accounts = new Map();
  let categoriesSet = new Set<string>();
  categoriesSet.add('All');

  const fetchData = async () => {
    // retrieves accounts from the user
    await axios
      .get('http://localhost:8000/api/accounts', {
        headers: {
          authorization: 'Bearer ' + getCookie(document.cookie, 'auth_token')
        }
      })
      .then((response) => {
        // stores the accounts in a map that will be used to link each transaction to respective account
        for (var account of response.data) {
          accounts.set(account.id, account.name);
        }
      });

    let plaidTransactions: Transaction[] = [];
    let totalTransactions = 1;
    while (plaidTransactions.length < totalTransactions) {
      // retrieves the transactions from the user (PAGINATED)
      let response = await axios.get('http://localhost:8000/api/transactions', {
        headers: {
          authorization: 'Bearer ' + getCookie(document.cookie, 'auth_token')
        },
        params: {
          offset: plaidTransactions.length
        }
      });

      totalTransactions = response.data.total_transactions;

      // populates the transactions array with data from response
      response.data.transactions.forEach((transaction, key) => {
        // pushes all fetched transactions to temp transactions array
        plaidTransactions.push({
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
      setTransactions(plaidTransactions);
    }
  };

  // eslint-disable-next-line
    useEffect(() => { fetchData(); }, []);

  return (
    <Card>
      <TransactionsTable
        transactions={transactions}
        categories={categoriesState}
      />
    </Card>
  );
};

export default Transactions;
