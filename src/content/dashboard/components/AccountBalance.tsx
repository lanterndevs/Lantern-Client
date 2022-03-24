import {
  Card,
  CardHeader,
  ListItemText,
  List,
  ListItem,
  Divider,
  ListItemAvatar,
  Avatar
} from '@mui/material';

import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import Text from 'src/components/Text';
import { useState } from 'react';
import { getCookie } from 'src/utils/cookies';
import axios from 'axios';
import AccountBalanceWalletTwoToneIcon from '@mui/icons-material/AccountBalanceWalletTwoTone';

const IconWrapperGreen = styled(Avatar)(
  ({ theme }) => `
        background-color: ${theme.colors.success.lighter};
        color:  ${theme.colors.success.main};
  `
);

function AccountBalance() {
  const [checked, setChecked] = useState(false);
  const [totalBalance, setBalance] = useState(0);

  // eslint-disable-next-line
    const [totalChange, setChange] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  axios
    .get('/api/accounts', {
      headers: {
        authorization: 'Bearer ' + getCookie(document.cookie, 'auth_token')
      }
    })
    .then((response) => {
      // computes thte total balance of all connected accounts
      let totalBalance = 0;
      for (var account of response.data) {
        totalBalance += account.balance;
      }
      setBalance(totalBalance);
    });

  return (
    <Card>
      <CardHeader title="Account Balance" />
      <Divider />
      <List disablePadding>
        <ListItem sx={{ py: 2 }}>
          <ListItemAvatar>
            <IconWrapperGreen>
              <AccountBalanceWalletTwoToneIcon fontSize="medium" />
            </IconWrapperGreen>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Text color="black">
                {' '}
                ${' '}
                {checked
                  ? totalBalance
                      .toFixed(2)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  : '********'}{' '}
              </Text>
            }
            primaryTypographyProps={{
              variant: 'body1',
              fontWeight: 'bold',
              color: 'textPrimary',
              gutterBottom: true,
              noWrap: true,
              fontSize: 19
            }}
          />
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </ListItem>

        <Divider />
        <ListItem sx={{ py: 2 }}>
          <ListItemText
            // hard-coded values, still needs to be computed using the initial account balance at the start of the month
            primary={
              <Text color="black">
                {' '}
                Net change of{' '}
                {checked ? (
                  totalChange > 0 ? (
                    <Text color="success"> {'+3.32%'} </Text>
                  ) : (
                    <Text color="error"> {'-2.32%'} </Text>
                  )
                ) : (
                  '****'
                )}{' '}
                this month.{' '}
              </Text>
            }
            primaryTypographyProps={{
              variant: 'body1',
              fontWeight: 'bold',
              color: 'textPrimary',
              gutterBottom: true,
              noWrap: true
            }}
          />
        </ListItem>
        <Divider />
      </List>
    </Card>
  );
}

export default AccountBalance;
