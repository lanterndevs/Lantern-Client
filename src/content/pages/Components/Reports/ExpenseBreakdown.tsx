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
import axios from 'axios';
import { getCookie } from 'src/utils/cookies';
import { useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';

function getCount(data) {
  // `map` out the data by type
  const typeArr = data.map((object) => object.categories[0]);

  // Iterate over the type data. We pass in an initial
  // object to capture the counts, so we need to use
  // `Object.values` to grab the object values at the end
  // of the iteration
  return Object.values(
    typeArr.reduce((acc, id) => {
      // If the key doesn't exist in the accumulator object
      // create it and create a new array at its value
      acc[id] = acc[id] || [id, 0];

      // Increment the second index (the count)
      acc[id][1]++;

      // Return the object for the next iteration
      return acc;
    }, {})
  );
}

function getFrequent(transactions) {
  let itemsMap = {};
  let maxValue = 0;
  let maxCount = 0;

  // iterates through the list of transactions
  for (let transaction of transactions) {
    // counts how many time each transaction is recorded
    if (itemsMap[transaction.name] == null) {
      itemsMap[transaction.name] = 1;
    } else {
      itemsMap[transaction.name]++;
    }

    // determines the transactrion with the most occurences
    if (itemsMap[transaction.name] > maxCount) {
      maxValue = transaction.name;
      maxCount = itemsMap[transaction.name];
    }
  }

  // returns an array with the transaction with the most occurences
  return [maxValue, maxCount];
}

function ExpenseBreakdown() {
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [totalExpenses, setTotalExepnses] = useState(0);

  // eslint-disable-next-line
  const [detailedExpenses, setDetailedExpenses] = useState({
    highestExpenseCateogry: '',
    leastExpenseCategory: '',
    frequentExpenses: [],
    largestTransaction: []
  });

  useEffect(() => {
    // retrieves the transactions from the user
    axios
      .get('/api/transactions', {
        headers: {
          authorization: 'Bearer ' + getCookie(document.cookie, 'auth_token')
        }
      })
      .then((response) => {
        // creates an array of arrays from the response data storing the category and number of expenses made for respective category
        var categoryData = getCount(response.data.transactions);

        // computes the total number of expenses made
        var total = 0;
        categoryData.forEach((category) => {
          total += category[1];
        });
        setTotalExepnses(total);

        // corverts category data to array of objects
        var categoryObject = categoryData.map(([name, value]) => ({
          name,
          value
        }));

        // stores array of cateogories into variable
        setExpenseCategories(categoryObject);

        // performs detailed analysis of expenses

        // sorts the category list from highest to least
        categoryObject.sort((a, b) => {
          return b.value - a.value;
        });

        // computes the largest transaction from transactions
        const largestTransaction = response.data.transactions.reduce((a, b) =>
          a.amount > b.amount ? a : b
        );

        // stores detailed breakdown into an object
        setDetailedExpenses({
          highestExpenseCateogry: categoryObject[0].name,
          leastExpenseCategory: categoryObject[categoryObject.length - 1].name,
          frequentExpenses: getFrequent(response.data.transactions),
          largestTransaction: [
            largestTransaction.name,
            largestTransaction.amount,
            largestTransaction.date
          ]
        });
      });
  }, []);

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
            <br /> Highest Categorized Expense:{' '}
            {detailedExpenses.highestExpenseCateogry} <br />
            Least Categorized Expense: {
              detailedExpenses.leastExpenseCategory
            }{' '}
            <br />
            Largest Transaction: {detailedExpenses.largestTransaction[0]} $
            {detailedExpenses.largestTransaction[1]}{' '}
            {detailedExpenses.largestTransaction[2]} <br />
            Most Frequent Transaction: {detailedExpenses.frequentExpenses[0]}
          </Box>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ExpenseBreakdown;
