import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';
import PageHeader from './PageHeader';
import ReturnOnInvestment from './ReturnOnInvestment';
import LoanRepayment from './LoanRepayment';
import CompoundAnnualGrowthRate from './CompoundAnnualGrowthRate';

function Calculators() {
  return (
    <>
      <Helmet>
        <title>Calculators</title>
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
            <CompoundAnnualGrowthRate />
          </Grid>
          <Grid item xs={12}>
            <LoanRepayment />
          </Grid>
          <Grid item xs={12}>
            <ReturnOnInvestment />
          </Grid>
          <Grid item xs={12}></Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Calculators;
