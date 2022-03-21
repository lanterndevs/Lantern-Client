import {
    Card,
    CardHeader,
    Divider,
    Grid,
    Box
  } from '@mui/material';

import axios from 'axios';
import { useEffect, useState } from 'react';  
import Chart from 'react-google-charts';
import { getCookie } from 'src/utils/cookies';

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

function Expenses() {
    const [expenseCategories, setExpenseCategories] = useState([]);

    const pieData = [
        ['Expense Category', 'Amount per Category'],
        ...expenseCategories
    ]
    
    const pieOptions = {
      title: 'Total Expense Breakdown',
      pieHole: 0.4,
      is3D: true,
    }

    useEffect(() => {
        // retrieves the transactions from the user
        axios.get('/api/transactions', {
            headers: {
                authorization: 'Bearer ' + getCookie(document.cookie, "auth_token"),
            }
            }).then((response) => {
                setExpenseCategories(getCount(response.data));
        })
    }, []);
  
    return (
      <Card>
        <CardHeader title="Expenses" />
        <Divider />
        <Box display="flex" alignItems="left">
        {/* <Grid container direction="row" justifyContent="right" sx={{ marginLeft: 1 }}> */}
        <Chart
          width={'150%'}
          height={'450px'}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={pieData}
          options={pieOptions}
          rootProps={{ 'data-testid': '3' }}
        />
        </Box>
        {/* </Grid> */}
      </Card>
    );
  }
  
  export default Expenses;
  