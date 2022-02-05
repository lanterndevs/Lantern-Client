import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';
import AccountSecurity from './AccountSecurity';


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
            {/* Chart that displays net income (profit?) based on financial account and transactions */}
          </Grid>
          
          {/* Chart that displays the break down of expenses based on transactions */}
          <Grid item lg={4} xs={12}>
            <AccountSecurity />
          </Grid>
          
          <Grid item lg={8} xs={12}>
            {/* <Wallets /> */}
          </Grid>
          
          <Grid item xs={12}>
            {/* <WatchList /> */}
          </Grid>

        </Grid>
      </Container>
      
      <Footer />
    </>
  );
}

export default Dashboard;
