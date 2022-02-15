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


const account = [
  {
    bank: "Plaid",
    accountName: "Plaid Checking",
    balance: "$100.00",
    latestUpdate: "February 2, 2022 6:00 PM"
  },

  {
    bank: "Plaid",
    accountName: "Plaid Checking",
    balance: "$100.00",
    latestUpdate: "February 2, 2022 6:00 PM"
  },

  {
    bank: "Plaid",
    accountName: "Plaid Checking",
    balance: "$100.00",
    latestUpdate: "February 2, 2022 6:00 PM"
  }
]

const Accounts = () => {

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
                    <TableRow hover>
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
                            {account[0].bank}
                            
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
                            {account[0].accountName}
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
                      {account[0].balance}
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
                      {account[0].latestUpdate}
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
          </TableBody>
          </Table>
          </TableContainer>

    </Card>
    );
}
export default Accounts;