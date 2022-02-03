import { Typography, Grid } from '@mui/material';

// import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

function PageHeader() {

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Transactions
        </Typography>
        <Typography variant="subtitle2">
          Below are your recent transactions
        </Typography>
      </Grid>
      <Grid item>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
