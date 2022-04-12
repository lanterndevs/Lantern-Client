import { Card, CardHeader, Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import Chart from 'react-google-charts';
import { useSelector } from 'react-redux';
import LoadingWheel from 'src/content/pages/Components/LoadingWheel';
import { RootState } from '../../../redux/index';

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

function Expenses() {
  const transactionsState = useSelector(
    (state: RootState) => state.transactions
  );
  const [expenseCategories, setExpenseCategories] = useState([]);

  const pieData = [
    ['Expense Category', 'Amount per Category'],
    ...expenseCategories
  ];

  const pieOptions = {
    // title: 'Total Expense Breakdown',
    is3D: true,
    alignment: 'center'
  };

  useEffect(() => {
    setExpenseCategories(getCount(transactionsState.transactions));
  }, [transactionsState]);

  return (
    <Card style={{height:"100%"}}>
      <CardHeader title="Expenses" />
      <Divider />
      <LoadingWheel loaded={!transactionsState.loading}>
        <Chart
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={pieData}
          options={pieOptions}
          rootProps={{ 'data-testid': '3' }}
        />
      </LoadingWheel>
    </Card>
  );
}

export default Expenses;
