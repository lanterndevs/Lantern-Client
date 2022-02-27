import {
  Divider,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Typography,
  CardHeader,
  Tooltip,
  IconButton
} from '@mui/material';

import RefreshTwoToneIcon from '@mui/icons-material/RefreshTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { Account } from 'src/models/account';
import { FC } from 'react';

interface AccountProps {
  accounts: Account[];
}

const Accounts: FC<AccountProps> = ({accounts}) => {

return(
    <Card>
        <CardHeader title="Accounts" />
        <Divider />
        
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox"></TableCell>
                        <TableCell>Bank Name</TableCell>
                        <TableCell>Account Name</TableCell>
                        <TableCell>Balance</TableCell>
                        <TableCell>Latest Update</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                
                <TableBody>
                  {accounts.map((account) => {
                    return (
                    <TableRow hover key={account.id}>
                        <TableCell padding="checkbox"/>
                        
                        {/* Displays the name of the Bank connected */}
                        
                        <TableCell>
                            <Typography
                            variant="body1"
                            fontWeight="bold"
                            color="text.primary"
                            gutterBottom
                            noWrap
                        >
                            {account.bankName}
                            
                            </Typography>
                        </TableCell>

                        {/* Displays the name of the account connected */}
                        <TableCell>
                            <Typography
                            variant="body1"
                            fontWeight="bold"
                            color="text.primary"
                            gutterBottom
                            noWrap
                        >
                            {account.name}
                            </Typography>
                        </TableCell>

                  {/* Displays the current account balance of the bank connected */}
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {account.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </Typography>
                  </TableCell>

                    {/* Displays the last date and time that the account was updated using Plaid API */}
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {account.latestUpdate}
                    </Typography>
                  </TableCell>

                 {/* Displays actions to either refresh or remove connected account */}
                  <TableCell >
                    <Tooltip title="Refresh" arrow>
                      <IconButton
                        color="inherit"
                        size="small"
                      >
                        <RefreshTwoToneIcon fontSize="medium" />
                      </IconButton>
                    
                    </Tooltip>
                    <Tooltip title="Remove Account" arrow>
                      <IconButton
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="medium" />
                      </IconButton>
                    </Tooltip>
                  
                  </TableCell>
                </TableRow>
                );
              })}
          </TableBody>
          </Table>
          </TableContainer>
    </Card>
  );
}
export default Accounts;