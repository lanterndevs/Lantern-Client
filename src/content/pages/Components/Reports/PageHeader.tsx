import { Typography, Grid } from '@mui/material';

function PageHeader() {

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Financial Reports
        </Typography>
        <Typography variant="subtitle2">
          Below are all of the financial reports available from retrived data
        </Typography>
      </Grid>
      <Grid item>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
