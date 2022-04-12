import { Typography, Grid } from '@mui/material';

function PageHeader() {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Calculators
        </Typography>
        <Typography variant="subtitle2">
          Below are some helpful calculators that will aid you in financial
          estimation and growth
        </Typography>
      </Grid>
      <Grid item></Grid>
    </Grid>
  );
}

export default PageHeader;
