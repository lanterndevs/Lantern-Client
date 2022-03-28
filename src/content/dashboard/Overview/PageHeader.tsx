import { Typography, Grid } from '@mui/material';

function PageHeader() {
  return (
    <Grid container alignItems="center">
      <Grid item></Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Overview
        </Typography>

        <Typography variant="subtitle2">
          Below is a general look into your overall finances
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
