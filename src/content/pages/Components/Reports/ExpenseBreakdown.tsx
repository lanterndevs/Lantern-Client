import {
  Container,
  Grid,
  ButtonGroup,
  Button,
  Table,
  TableCell,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box
} from '@mui/material';
import Footer from 'src/components/Footer';
import { useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';
import moment from 'moment';
import { getCount, getFrequent } from './ReportHelpers';
import { RootState } from 'src/redux/index';
import { useSelector } from 'react-redux';

function ExpenseBreakdown() {
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);

  // eslint-disable-next-line
  const [detailedExpenses, setDetailedExpenses] = useState({
    totalTransactions: '',
    highestExpenseCategory: '',
    leastExpenseCategory: '',
    frequentExpenses: [],
    largestTransaction: []
  });

  const transactionsState = useSelector((state: RootState) => state.transactions);

  useEffect(() => {
    if (!transactionsState.loading) {
      // creates an array of arrays from the response data storing the category and number of expenses made for respective category
      let categoryData = getCount(transactionsState.transactions);

      // computes the total number of expenses made
      let total = 0;
      categoryData.forEach((category) => {
        total += category[1];
      });
      setTotalExpenses(total);

      // Converts category data to array of objects
      let categoryObject = categoryData.map(([name, value]) => ({
        name,
        value
      }));

      // stores array of categories into variable
      setExpenseCategories(categoryObject);

      // performs detailed analysis of expenses

      // sorts the category list from highest to least
      categoryObject.sort((a, b) => {
        return b.value - a.value;
      });

      // computes the largest transaction from transactions
      const largestTransaction = transactionsState.transactions.reduce((a, b) =>
          a.amount > b.amount ? a : b
      );

      // stores detailed breakdown into an object
      setDetailedExpenses({
        totalTransactions: transactionsState.total_transactions.toString(),
        highestExpenseCategory: categoryObject[0].name,
        leastExpenseCategory: categoryObject[categoryObject.length - 1].name,
        frequentExpenses: getFrequent(transactionsState.transactions),
        largestTransaction: [
          largestTransaction.name,
          largestTransaction.amount,
          largestTransaction.date
        ]
      });
    }
  }, [transactionsState]);

  return (
    <>
      <ButtonGroup
        size="medium"
        sx={{
          justifyContent: 'right',
          display: 'flex',
          marginRight: '25px',
          marginBottom: '25px'
        }}
      >
        <Button variant="outlined" name="Chart">
          Day
        </Button>
        <Button variant="outlined" name="Normal">
          Week
        </Button>
        <Button variant="outlined" name="Normal">
          Year
        </Button>
      </ButtonGroup>

      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="left"
          alignItems="stretch"
          spacing={1}
        >
          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Category</TableCell>
                  <TableCell>Percentage of Total Expenses</TableCell>
                  <TableCell>Number of Expenses</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {expenseCategories.map((category) => (
                  <TableRow
                    key={category.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {/* Displays the name of the category */}
                        {category.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      {/* Displays the percentage that the category makes up */}
                      <ProgressBar
                        done={((category.value / totalExpenses) * 100).toFixed(
                          2
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {category.value}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ mt: 5 }}>
            <Typography
              variant="h3"
              fontWeight="bold"
              color="text.primary"
              gutterBottom
              noWrap
            >
              Detailed Report
            </Typography>
            <hr style={{ borderTop: '2px solid black' }} />
            <p style={{ lineHeight: '300%' }}>
              <b>Total Transactions over Time Span:</b>{' '}
              {detailedExpenses.totalTransactions} <br />
              <b>Highest Categorized Expense:</b>{' '}
              {detailedExpenses.highestExpenseCategory} <br />
              <b>Least Categorized Expense:</b>{' '}
              {detailedExpenses.leastExpenseCategory} <br />
              <b>Largest Transaction:</b>{' '}
              {detailedExpenses.largestTransaction.length ? (
                <div>
                  &emsp;&emsp;Name: {detailedExpenses.largestTransaction[0]}
                  <br /> &emsp;&emsp;Date:{' '}
                  {moment(detailedExpenses.largestTransaction[2]).format(
                    'dddd MMMM DD, YYYY'
                  )}
                  <br /> &emsp;&emsp;Amount:{' '}
                  {detailedExpenses.largestTransaction[1].toLocaleString(
                    'en-US',
                    {
                      style: 'currency',
                      currency: 'USD'
                    }
                  )}
                </div>
              ) : (
                <br />
              )}
              <b>Most Frequent Transaction:</b>{' '}
              {detailedExpenses.frequentExpenses[0]}
              {', '}
              {detailedExpenses.frequentExpenses.length
                ? '(' +
                  detailedExpenses.frequentExpenses[1] +
                  ' Total Transactions)'
                : ' '}
            </p>
          </Box>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ExpenseBreakdown;
