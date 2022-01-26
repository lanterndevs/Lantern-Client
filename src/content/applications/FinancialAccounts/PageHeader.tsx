import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';


function addAccount() {
  alert("This is where we check how many accounts the user currently has connected, and linked an additional one if needed.");
}


function PageHeader() {

  const user =
  {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Financial Accounts
        </Typography>
        <Typography variant="subtitle2">
          Below are the bank accounts that you have linked with Lantern
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={addAccount}
        >
          Add Account
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
