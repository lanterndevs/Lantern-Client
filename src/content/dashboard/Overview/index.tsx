import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';

import AccountBalance from './AccountBalance';
import Wallets from './Wallets';
import AccountSecurity from './AccountSecurity';
import WatchList from './WatchList';
import {CanvasJSChart} from 'canvasjs-react-charts';

function Dashboard() {

  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "dark1", // "light1", "dark1", "dark2"
    title:{
      text: "Bounce Rate by Week of Year"
    },
    axisY: {
      title: "Bounce Rate",
      suffix: "%"
    },
    axisX: {
      title: "Week of Year",
      prefix: "W",
      interval: 2
    },
    data: [{
      type: "line",
      toolTipContent: "Week {x}: {y}%",
      dataPoints: [
        { x: 1, y: 64 },
        { x: 2, y: 61 },
        { x: 3, y: 64 },
        { x: 4, y: 62 },
        { x: 5, y: 64 },
        { x: 6, y: 60 },
        { x: 7, y: 58 },
        { x: 8, y: 59 },
        { x: 9, y: 53 },
        { x: 10, y: 54 },
        { x: 11, y: 61 },
        { x: 12, y: 60 },
        { x: 13, y: 55 },
        { x: 14, y: 60 },
        { x: 15, y: 56 },
        { x: 16, y: 60 },
        { x: 17, y: 59.5 },
        { x: 18, y: 63 },
        { x: 19, y: 58 },
        { x: 20, y: 54 },
        { x: 21, y: 59 },
        { x: 22, y: 64 },
        { x: 23, y: 59 }
      ]
    }]
  }

  return (
    <>
      <Helmet>
        <title>Overview</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="left"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
          <CanvasJSChart options = {options} />
            {/* This is where the graph will end up going */}
          </Grid>
          <Grid item lg={8} xs={12}>
            {/* <Wallets /> */}
          </Grid>
          <Grid item lg={4} xs={12}>
            {/* <AccountSecurity /> */}
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
