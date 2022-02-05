import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';
import NoAccount from './NoAccount';
  
function ApplicationsFinancialAccount() {

  const hasAccount = false;
  
  return (
    <>
      <Helmet>
        <title>Financial Accounts</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>

            {/* Loads Financial Accounts Component if the user has an account connected */}
            
            {/* Loads No Accounts Component if the user does not have an account connected */}
            {!hasAccount && <NoAccount />}

          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ApplicationsFinancialAccount;
