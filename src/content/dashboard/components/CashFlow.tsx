import {
    Card,
    CardHeader,
    Divider
} from '@mui/material';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { retrieveCashFlow } from '../../../utils/cashflow';

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
    /**
     * The options for the chart.
     *
     * @type Object
     */
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
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
                    label: "Revenue",
                    borderColor: '#000000',
                    backgroundColor: '#000000',
                    data: revenue,
                    tension: 0.1
                },
                {
                    label: "Expenses",
                    borderColor: '#ff4e33',
                    backgroundColor: '#ff4e33',
                    data: expenses,
                    tension: 0.1
                },
                {
                    label: "Profit",
                    borderColor: "#3dc5ff",
                    backgroundColor: '#3dc5ff',
                    data: profit,
                    tension: 0.1
                }
            ]
        }
    };

    const [chartType, setChartType] = useState('month');
    const [state, setState] =
        useState({
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
        retrieveCashFlow().then(([week, month, year]) => {
            setState({
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
        });
    }, []);

    // data for the current chart type
    const chartData = useMemo(() => {
        switch (chartType) {
            case 'week':
                // console.log(state.weekLabels);
                // console.log(state.weekRevenue);
                // console.log(state.weekExpenses);
                // console.log(state.weekProfit);
                return data(state.weekLabels, state.weekRevenue, state.weekExpenses, state.weekProfit);
            case 'month':
                // console.log(state.monthLabels);
                // console.log(state.monthRevenue);
                // console.log(state.monthExpenses);
                // console.log(state.monthProfit);
                return data(state.monthLabels, state.monthRevenue, state.monthExpenses, state.monthProfit);
            case 'year':
                // console.log(state.yearLabels);
                // console.log(state.yearRevenue);
                // console.log(state.yearExpenses);
                // console.log(state.yearProfit);
                return data(state.yearLabels, state.yearRevenue, state.yearExpenses, state.yearProfit);
            default:
                // console.log("Default taken!");
                return [];
        }
    }, [chartType, state]);

    // updates which chart is displayed
    const handleClick = useCallback((e) => {
        e.preventDefault();
        const type = e.target.outerText.toLowerCase();
        // console.log(e);
        // console.log(type);
        setChartType(type);
    }, [setChartType]);

    // console.log("chartData:");
    // console.log(chartData);

    return (
        <Card className="cashFlowChart">
            <CardHeader title="Cash Flow Breakdown" onClick={handleClick}/>
            <Divider/>
            {/*@ts-ignore*/}
            <Line data={chartData} options={options}/>
        </Card>
    );
};

export default memo(CashFlow);
