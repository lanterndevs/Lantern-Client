import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Box } from '@mui/material';
import Footer from 'src/components/Footer';
import UpcomingEvents from '../components/UpcomingEvents';
import CashFlow from '../components/CashFlow';
import RevenueBreakdown from '../components/RevenueBreakdown';
import AccountBalance from '../components/AccountBalance';
import Expenses from '../components/Expenses';
import { RootState } from 'src/redux/index';
import axios from 'axios';
import { getCookie } from 'src/utils/cookies';
import { useDispatch, useSelector } from 'react-redux';
import {
  saveTransactions,
  setTransactionLoading,
  setTransactionTimestamp
} from 'src/redux/modules/transactions';
import {
  saveLayouts
} from 'src/redux/modules/dashboard';
import {useEffect} from 'react';
import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

function Dashboard() {
  const dispatch = useDispatch();
  const transactionsState = useSelector(
    (state: RootState) => state.transactions
  );
  const dashboardState = useSelector(
    (state: RootState) => state.dashboard
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
      {/* <ResponsiveGridLayout className="layout" cols={3} layout={layout} rowHeight={100} width={1000} autoSize={true}> */}
      <ResponsiveGridLayout
        className="layout"
        rowHeight={120}
        layouts={dashboardState.layouts}
        breakpoints={{ lg: 1000}}
        cols={{ lg: 3}}
        onLayoutChange={(curr, all) => {dispatch(saveLayouts(all))}}
      >
        <div key="a">
          <CashFlow/>
        </div>
        <div key="b">
        
        <AccountBalance/>
        </div>
        <div key="c">
          <RevenueBreakdown/>
        </div>
        <div key="d">
          <Expenses/>  
        </div>
        <div key="e">
          <UpcomingEvents/>
        </div>

      </ResponsiveGridLayout>

      </Container>

      <Footer />
    </>
  );
}

export default Dashboard;
