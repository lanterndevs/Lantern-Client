import { Typography, Grid, Button } from '@mui/material';

function PageHeader({refreshFunction}) {
  return (
    <Grid container alignItems="center" justifyContent="space-between">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Overview
        </Typography>

        <Typography variant="subtitle2">
          Below is a general look into your overall finances
        </Typography>
      </Grid>
      <Grid item>
        <Button variant="contained" size="large" onClick={() => {refreshFunction(true)}}>
          Refresh
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
