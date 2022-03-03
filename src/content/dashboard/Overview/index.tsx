import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Box } from '@mui/material';
import Footer from 'src/components/Footer';
import UpcomingEvents from '../components/UpcomingEvents';
import CashFlow from '../components/CashFlow';
import AccountBalance from '../components/AccountBalance';

function Dashboard() {

  return (
    <>
      <Helmet>
        <title>Overview</title>
      </Helmet>
      
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      
      <Container maxWidth="lg">
        <Grid container direction="row" justifyContent="left" alignItems="stretch" spacing={3}>
          <Grid item lg={8} xs={12}>
            {/* Cash Flow Breakdown that displays weekly, monthly, and yearly net revenue */}
            <CashFlow />
          </Grid>
          
          {/* Account Balance & Upcoming Events */}
          <Grid item lg={4} xs={12}>
            <AccountBalance />
            
            <Box sx={{ m: 5.2 }} />
            
            <UpcomingEvents />
          </Grid>

        </Grid>
      </Container>
      
      <Footer />
    </>
  );
}

export default Dashboard;
