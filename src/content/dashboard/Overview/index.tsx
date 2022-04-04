import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Box } from '@mui/material';
import Footer from 'src/components/Footer';
import UpcomingEvents from '../components/UpcomingEvents';
import CashFlow from '../components/CashFlow';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import RevenueBreakdown from '../components/RevenueBreakdown';
import AccountBalance from '../components/AccountBalance';
import Expenses from '../components/Expenses';
import { RootState } from 'src/redux/index';
import axios from 'axios';
import { getCookie } from 'src/utils/cookies';
import { useDispatch, useSelector } from 'react-redux';
import {
  saveTransactions,
  saveTotalTransactions,
  setTransactionLoading,
  setTransactionTimestamp
} from 'src/redux/modules/transactions';
import { useEffect } from 'react';

function Dashboard() {
  const dispatch = useDispatch();
  const transactionsState = useSelector(
    (state: RootState) => state.transactions
  );

  const fetchData = async (force) => {
    // retrieves the transactions from the user
    if (transactionsState.loading || force) {
      axios.get(
        'http://localhost:8000/api/transactions', {
        headers: {
          authorization: 'Bearer ' + getCookie("auth_token"),
        }
      }).then((response) => {
        dispatch(saveTransactions(response.data.transactions));
        dispatch(saveTotalTransactions(response.data.total_transactions));
        dispatch(setTransactionLoading(false));
        dispatch(setTransactionTimestamp(Date.now()));
        // populates the accounts array with data from response
      })
    } 
  }

  useEffect(() => {
    fetchData(false);
    const interval=setInterval(()=>{
      fetchData(true);
     },1000 * 60 * 10)
    return()=>clearInterval(interval);
  }, []);

  return (
    <>
      <Helmet>
        <title>Overview</title>
      </Helmet>

      <PageTitleWrapper>
        <PageHeader refreshFunction={fetchData}/>
      </PageTitleWrapper>

      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="left"
          alignItems="stretch"
          spacing={3}
        >
          {/* FIRST SECTION: CASH FLOW , ACCOUNT BALANCE, UPCOMING EVENTS */}
          <Grid item lg={8} xs={12}>
            {/* Cash Flow Breakdown that displays weekly, monthly, and yearly net revenue */}
            <CashFlow />
          </Grid>

          {/* Account Balance */}
          <Grid item lg={4} xs={12}>
            <AccountBalance />
            {/* Space Divider */}
            <Box sx={{ m: 5.2 }} />
            {/* Upcoming Events */}
            <UpcomingEvents />
          </Grid>
          {/* SECOND SECTION: EXPENSES, GOALS (?), ETC (?) */}
          <Grid item lg={9} xs={12}>
            <RevenueBreakdown/>
            {/* Expenses */}
            <Expenses />
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </>
  );
}

export default Dashboard;
