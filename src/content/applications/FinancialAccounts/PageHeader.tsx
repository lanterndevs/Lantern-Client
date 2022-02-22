import { Typography, Button, Grid, Box } from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import axios from 'axios';
import { useCallback, useState, useEffect, useContext } from 'react';
import { usePlaidLink, PlaidLinkOnSuccess } from 'react-plaid-link';
import Accounts from './Accounts';
import { Account } from 'src/models/account';
import { AuthenticationContext } from '../Login/authenticationContext';


const PageHeader = () => {
  // will be used to populate the list of plaid accounts
  let accounts: Account[] = [{
    balance: 232,
    description: "Tosin",
    id: "Tosin",
    institutionID: "Tosin",
    name: "Tosin",
    bankName: "tosin",
    latestUpdate: "Tosin"
  }
];

function updateArray(){
  accounts.push(    
    {
      balance: 232,
      description: "Tosin",
      id: "Tosin",
      institutionID: "Tosin",
      name: "Tosin",
      bankName: "tosin",
      latestUpdate: "Tosin"
  })

  
}

  // eslint-disable-next-line
  const {authToken, setAuthToken } = useContext(AuthenticationContext); // the user authentication token
  const [token, setToken] = useState<string | null>(null); // link token received from Plaid
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [publicToken, setPublicToken] = useState<string | null>(null); // public token received upon adding account with Plaid

  // initial communication on render between server and Plaid to obtain link to add a new account
  useEffect(() => {
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

    // uses public token to retrieve access token for accounts and transactions
    axios.post('http://localhost:8000/api/link', { token: publicToken },{
      headers: {
        authorization: 'Bearer ' + authToken,
      }
    }).then(response => {
      setAccessToken(response.data.token);

      // retrieve the accounts from server
      axios.get('http://localhost:8000/api/accounts', {
        headers: {
          authorization: 'Bearer ' + authToken,
        }
      }).then((response) => {

        // populates the accounts array with data from response
        for(var account of response.data){
          accounts.push(
            {
              balance: account.balance,
              description: account.description,
              id: account.id,
              institutionID: account.institutionID,
              name: account.name,
              bankName: "Plaid",
              latestUpdate: "February 22, 2022"
            }
          );
        }

        console.log(accounts);

      });
    })
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

        <Button
          onClick={() => open()}
        >
          Add an Account

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