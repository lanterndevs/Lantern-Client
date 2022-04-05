import { RootState } from 'src/redux/index';
import { useSelector } from 'react-redux';
import TransactionBreakdown from './TransactionBreakdown';
import { useEffect, useState } from 'react';
import { filterForRevenue } from './ReportHelpers';

function RevenueBreakdown() {
  const [revenues, setRevenues] = useState([]);
  const transactionsState = useSelector(
    (state: RootState) => state.transactions
  );

  useEffect(() => {
    if (!transactionsState.loading) {
      setRevenues(filterForRevenue(transactionsState.transactions));
    }
  }, [transactionsState]);

  return TransactionBreakdown(revenues, 'revenue');
}

export default RevenueBreakdown;
