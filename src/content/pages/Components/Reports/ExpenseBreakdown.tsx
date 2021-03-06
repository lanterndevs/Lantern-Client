import { RootState } from 'src/redux/index';
import { useSelector } from 'react-redux';
import TransactionBreakdown from './TransactionBreakdown';
import { useEffect, useState } from 'react';
import { filterForExpenses } from './ReportHelpers';

function ExpenseBreakdown() {
  const [expenses, setExpenses] = useState([]);
  const transactionsState = useSelector(
    (state: RootState) => state.transactions
  );

  useEffect(() => {
    if (!transactionsState.loading) {
      setExpenses(filterForExpenses(transactionsState.transactions));
    }
  }, [transactionsState]);

  return TransactionBreakdown(expenses, 'expense');
}

export default ExpenseBreakdown;
