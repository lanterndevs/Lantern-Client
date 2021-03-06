import { Typography, Button, Grid, Box } from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import axios from 'axios';
import { useCallback, useState, useEffect } from 'react';
import { usePlaidLink, PlaidLinkOnSuccess } from 'react-plaid-link';
import Accounts from './Accounts';
import { Account } from 'src/models/account';
import moment from 'moment';
import { getCookie } from 'src/utils/cookies';

const PageHeader = () => {
  // will be used to populate the list of plaid accounts
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [token, setToken] = useState<string | null>(null); // link token received from Plaid

  // initial communication on render between server and Plaid to obtain link to add a new account
  useEffect(() => {
    axios
      .get('/api/accounts', {
        headers: {
          authorization: 'Bearer ' + getCookie('auth_token')
        }
      })
      .then((response) => {
        // populates the accounts array with data from response
        let tempAccounts: Account[] = [];
        for (var account of response.data) {
          tempAccounts.push({
            balance: account.balance,
            description: account.description,
            id: account.id,
            institutionID: account.institution.id,
            name: account.name,
            bankName: account.institution.name,
            latestUpdate: moment(new Date()).format('l , LT')
          });
        }
        setAccounts(tempAccounts);
      });

    axios
      .get('/api/link', {
        headers: {
          authorization: 'Bearer ' + getCookie('auth_token')
        }
      })
      .then((response) => {
        setToken(response.data.token);
      });
  }, []);

  const onSuccess = useCallback<PlaidLinkOnSuccess>((publicToken, metadata) => {
    // send public_token to your server
    // https://plaid.com/docs/api/tokens/#token-exchange-flow
    // uses public token to retrieve access token for accounts and transactions
    axios
      .post(
        '/api/link',
        { token: publicToken },
        {
          headers: {
            authorization: 'Bearer ' + getCookie('auth_token')
          }
        }
      )
      .then((response) => {
        // retrieve the accounts from server
        axios
          .get('/api/accounts', {
            headers: {
              authorization: 'Bearer ' + getCookie('auth_token')
            }
          })
          .then((response) => {
            // populates the accounts array with data from response
            let tempAccounts: Account[] = [];
            for (var account of response.data) {
              tempAccounts.push({
                balance: account.balance,
                description: account.description,
                id: account.id,
                institutionID: account.institutionID,
                name: account.name,
                bankName: 'Plaid', // will need to determine how to pull this information from Plaid API
                latestUpdate: moment(new Date()).format('l , LT')
              });
            }

            // updates the states of the financial accounts
            setAccounts(tempAccounts);
          });
      });
  }, []);

  const { open, ready } = usePlaidLink({
    token,
    onSuccess
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
            onClick={() => open()}
            disabled={!ready}
          >
            Add Account
          </Button>
        </Grid>
      </Grid>

      {/* Creates space in between page header and accounts */}
      <Box m={1} pt={2} />

      {/* Displays the connected accounts */}
      <Accounts accounts={accounts} />
    </>
  );
};

export default PageHeader;
