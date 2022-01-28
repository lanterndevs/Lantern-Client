import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';
import NoTransactions from './NoTransactions';
import { useState } from 'react';
import Transactions from './Transactions';

function ApplicationsTransactions() {

  const [hasTransactions, setHasTransactions] = useState(true); 
  
  return (
    <>
      <Helmet>
        <title>Transactions</title>
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

            {/* Loads Transactions Component if the user has any transactions */}
            {hasTransactions && <Transactions />}
            
            {/* Loads No Transactions Component if the user does not have any current transactions on the account */}
            {!hasTransactions && <NoTransactions />}

          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ApplicationsTransactions;
