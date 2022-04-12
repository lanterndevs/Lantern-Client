import { Card, CardHeader } from '@mui/material';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { RetrieveCashFlow } from 'src/utils/cashflow';
import ChartHeader from './ChartHeader';
import { RootState } from 'src/redux/index';
import LoadingWheel from 'src/content/pages/Components/LoadingWheel';
import { useSelector } from 'react-redux';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Sets default values for chart properties
ChartJS.defaults.font.family = 'Roboto';
ChartJS.defaults.font.size = 14;

const CashFlow = () => {
  const transactionsState = useSelector((state: RootState) => state.transactions);
  const dashboardState = useSelector((state: RootState) => state.dashboard);

  /**
   * The options for the chart.
   *
   * @type Object
   */
  const options = {
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return '$' + value;
          }
        }
      }
    },
    maintainAspectRatio : false,
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      }
    }
  };

  /**
   * Returns data for chart.
   *
   * @param {Array} labels - The labels for cashflow (revenue, expenses, net).
   * @param {Array} data - The dollar amounts of each type.
   * @returns {Object} - The data object.
   */
  const data = (labels, revenue, expenses, profit) => {
    return {
      labels: labels,
      datasets: [
        {
          label: 'Revenue',
          borderColor: '#000000',
          backgroundColor: '#000000',
          data: revenue,
          tension: 0.1
        },
        {
          label: 'Expenses',
          borderColor: '#ff4e33',
          backgroundColor: '#ff4e33',
          data: expenses,
          tension: 0.1
        },
        {
          label: 'Profit',
          borderColor: '#3dc5ff',
          backgroundColor: '#3dc5ff',
          data: profit,
          tension: 0.1
        }
      ]
    };
  };

  const [state, setState] = useState({
    loaded: false,
    weekRevenue: [],
    weekExpenses: [],
    weekProfit: [],
    weekLabels: [],
    monthRevenue: [],
    monthExpenses: [],
    monthProfit: [],
    monthLabels: [],
    yearRevenue: [],
    yearExpenses: [],
    yearProfit: [],
    yearLabels: []
  });

  // retrieves cashflow if component did mount
  useEffect(() => {
    RetrieveCashFlow(transactionsState.transactions).then(
      ([week, month, year]) => {
        setState({
          loaded: true,
          weekRevenue: week.revenue,
          weekExpenses: week.expenses,
          weekProfit: week.profit,
          weekLabels: week.labels,
          monthRevenue: month.revenue,
          monthExpenses: month.expenses,
          monthProfit: month.profit,
          monthLabels: month.labels,
          yearRevenue: year.revenue,
          yearExpenses: year.expenses,
          yearProfit: year.profit,
          yearLabels: year.labels
        });
      }
    );
  }, [transactionsState]);


  // data for the current chart type
  const chartData = useMemo(() => {
    switch (dashboardState.cashflow_mode) {
      // displays data by the recent week
      case 'week':
        return data(
          state.weekLabels,
          state.weekRevenue,
          state.weekExpenses,
          state.weekProfit
        );

      // displays data by the recent month
      case 'month':
        return data(
          state.monthLabels,
          state.monthRevenue,
          state.monthExpenses,
          state.monthProfit
        );

      // displays data by the recent year
      case 'year':
        return data(
          state.yearLabels,
          state.yearRevenue,
          state.yearExpenses,
          state.yearProfit
        );

      // default display
      default:
        return [];
    }
  }, [dashboardState.cashflow_mode, state]);

  return (
    <Card className="cashFlowChart" style={{height:"100%"}}>
      <CardHeader title="Cash Flow Breakdown"/>
      <ChartHeader/>
      <div style={{height:"80%"}}>
      <LoadingWheel loaded={!transactionsState.loading}>
        {/*@ts-ignore*/}
        <Line data={chartData} options={options} /> 
      </LoadingWheel>
      </div>
    </Card>
  );
};

export default memo(CashFlow);
