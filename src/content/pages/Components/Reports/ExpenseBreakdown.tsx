import { Container, Grid, ButtonGroup, Button, Table, TableCell, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import Footer from 'src/components/Footer';
import axios from 'axios';
import { getCookie } from 'src/utils/cookies';
import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';

function getCount(data) {

  // `map` out the data by type
  const typeArr = data.map((object) => object.categories[0]); 

  // Iterate over the type data. We pass in an initial
  // object to capture the counts, so we need to use
  // `Object.values` to grab the object values at the end
  // of the iteration
  return Object.values(typeArr.reduce((acc, id) => {

    // If the key doesn't exist in the accumulator object
    // create it and create a new array at its value
    acc[id] = acc[id] || [id, 0];

    // Increment the second index (the count)
    acc[id][1]++;

    // Return the object for the next iteration
    return acc;
  }, {}));
}

function ExpenseBreakdown() {

    const [expenseCategories, setExpenseCategories] = useState([]);
    const [totalExenses, setTotalExepnses] = useState(0);

    useEffect(() => {
      // retrieves the transactions from the user
      axios.get('/api/transactions', {
          headers: {
              authorization: 'Bearer ' + getCookie(document.cookie, "auth_token"),
          }
          }).then((response) => {
            var categoryData = getCount(response.data);



            var categoryObject = categoryData.map(([name, value]) => ({name, value}));
            setExpenseCategories(categoryObject); 
      })
  }, []);

    return (
        <>
        <ButtonGroup size="medium" sx={{ justifyContent: 'right', display: 'flex', marginRight: '25px', marginBottom: '25px' }}>
            <Button variant="outlined" name="Chart">Day</Button>
            <Button variant="outlined" name="Normal">Week</Button>
            <Button variant="outlined" name="Normal">Year</Button>
        </ButtonGroup>

      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="left"
          alignItems="stretch"
          spacing={1}
        >
      
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell >Percentage of Total Expenses</TableCell>
            <TableCell >Number of Expenses</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {expenseCategories.map((category) => (
            <TableRow
              key={category.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row"> {category.name} </TableCell>
              <TableCell><progress value={category.value} max='100'/></TableCell>
              <TableCell> {category.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ExpenseBreakdown;
