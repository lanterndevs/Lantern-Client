import { Card, CardHeader, Divider } from '@mui/material';

import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-google-charts';
import { getCookie } from 'src/utils/cookies';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/index'
import LoadingWheel from '../../pages/Components/LoadingWheel'

function getTotals(data) {
  // `map` out the data by type
  const typeArr = data.map((object) => object.categories[0]);
  // Iterate over the type data. We pass in an initial
  // object to capture the counts, so we need to use
  // `Object.values` to grab the object values at the end
  // of the iteration


  return Object.entries(
    data.reduce((res, curr) => {
      // If the key doesn't exist in the accumulator object
      // create it and create a new array at its value
      if (curr.amount < 0) {
          console.log(curr)
        res[curr.categories[0]] = res[curr.categories[0]] || -curr.amount;
        res[curr.categories[0]]-=curr.amount;
      }
      // Return the object for the next iteration
      return res;
    }, {})
  );
}

function RevenueBreakdown() {
  const transactionsState = useSelector((state: RootState) => state.transactions);
  const [revenueCategories, setRevenueCategories] = useState([]);

  const pieData = [
    ['Revenue Category', 'Amount per Category'],
    ...revenueCategories
  ];

  const pieOptions = {
    // title: 'Total Expense Breakdown',
    is3D: true,
    alignment: 'center'
  };

  useEffect(() => {
      console.log(getTotals(transactionsState.transactions))
    setRevenueCategories(getTotals(transactionsState.transactions))
    console.log(pieData)
  }, [transactionsState]);

  return (
    <Card>
      <CardHeader title="Revenue Breakdown" />
      <Divider />
      <LoadingWheel loaded = {!transactionsState.loading}>
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

export default RevenueBreakdown;
