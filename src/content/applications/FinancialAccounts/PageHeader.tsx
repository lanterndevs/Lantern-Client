import { Typography, Button, Grid, Box } from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import axios from 'axios';
import { useCallback, useState, useEffect, useContext } from 'react';
import { usePlaidLink, PlaidLinkOnSuccess } from 'react-plaid-link';
import Accounts from './Accounts';
import { Account } from 'src/models/account';


const PageHeader = () => {

  // const [plaidAccounts, setPlaidAccounts] = useState({
  //   accounts: [
  //     {
  //       account_id: "",
  //       balances: [],
  //       mask: "",
  //       name: "",
  //       official_name: "",
  //       subtype: "",
  //       type: "",
  //     }
  //   ]
  // });

  let accounts: Account[] = [
    {
      bank: "Plaid",
      accountName: "Plaid Checking",
      balance: "$100.00",
      latestUpdate: "February 2, 2022 6:00 PM"
    },
    {
      bank: "Plaid",
      accountName: "Plaid Savings",
      balance: "$150.00",
      latestUpdate: "February 9, 2022 6:00 PM"
    },
  ];
  
  // need to replace the following line with function to import auth token
  const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoaWJpYmFsYUBnbWFpbC5jb20iLCJpYXQiOjE2NDUzMDYwNjMsImV4cCI6MTY0NTMwNzg2M30.0qTSQgtZJwHQdtaO52eCghlad0qgTtQrmvnL-kfa11c";
  // const {authToken, setAuthToken} = useContext(authenticationToken);
  const [token, setToken] = useState<string | null>(null); // link token received from Plaid
  const [publicToken, setPublicToken] = useState<string | null>(null);

  useEffect(() => {
    console.log(authToken); // checks that the auth token matches

    axios.get('http://localhost:8000/api/link', {
      headers: {
        authorization: 'Bearer ' + authToken,
      }
    }).then((response) => {
      setToken(response.data.token);
    });
  }, []);


  const onSuccess = useCallback<PlaidLinkOnSuccess>((publicToken, metadata) => {
    // send public_token to your server
    // https://plaid.com/docs/api/tokens/#token-exchange-flow
    setPublicToken(publicToken);
    console.log(publicToken);

    // retrieve the accounts using the Plaid public tokens
    axios.get('http://localhost:8000/api/accounts', {
      headers: {
        authorization: 'Bearer ' + publicToken,
      }
    }).then((response) => {
      // checks to see if the account data is as expected
      console.log(response);
      
    });
  }, []);

  const { open, ready } = usePlaidLink({
    token,
    onSuccess,
    // onEvent
    // onExit
  });

  return (
    <>
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
          onClick={() => open()} disabled={!ready}
        >
          Add Account

        </Button>
      </Grid>
    </Grid>

    {/* Creates space in between page header and accounts */}
    <Box m={1} pt={2}/>

    {/* Displays the connected accounts */}
    <Accounts accounts={accounts}/>

    </>
  );
}

export default PageHeader;