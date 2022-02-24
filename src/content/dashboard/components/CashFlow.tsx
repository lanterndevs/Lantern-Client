import { Card, Col } from 'antd';
import React, { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';
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

import ChartHeader from "./ChartHeader";
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
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
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
                    backgroundColor: '#ffffff',
                    borderWidth: 0,
                    data: revenue,
                    hoverBackgroundColor: '#ffffff'
                },
                {
                    label: "Expenses",
                    backgroundColor: '#ffffff',
                    borderWidth: 0,
                    data: expenses,
                    hoverBackgroundColor: '#ffffff'
                },
                {
                    label: "Profit",
                    backgroundColor: '#ffffff',
                    borderWidth: 0,
                    data: profit,
                    hoverBackgroundColor: '#ffffff'
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
        console.log("Calling retrieveCashFlow!")
        retrieveCashFlow().then(([week, month, year]) => {
            setState({
                weekRevenue: week.revenue,
                weekExpenses: week.expenses,
                weekProfit: week.profit,
                weekLabels: week.labels,
                monthRevenue: week.revenue,
                monthExpenses: week.expenses,
                monthProfit: week.profit,
                monthLabels: week.labels,
                yearRevenue: week.revenue,
                yearExpenses: week.expenses,
                yearProfit: week.profit,
                yearLabels: week.labels
            });
        });
    }, []);

    // data for the current chart type
    const chartData = useMemo(() => {
        console.log("Updating chartData!");
        switch (chartType) {
            case 'week':
                console.log(state.weekLabels);
                console.log(state.weekRevenue);
                console.log(state.weekExpenses);
                console.log(state.weekProfit);
                return data(state.weekLabels, state.weekRevenue, state.weekExpenses, state.weekProfit);
            case 'month':
                console.log(state.monthLabels);
                console.log(state.monthRevenue);
                console.log(state.monthExpenses);
                console.log(state.monthProfit);
                return data(state.monthLabels, state.monthRevenue, state.monthExpenses, state.monthProfit);
            case 'year':
                console.log(state.yearLabels);
                console.log(state.yearRevenue);
                console.log(state.yearExpenses);
                console.log(state.yearProfit);
                return data(state.yearLabels, state.yearRevenue, state.yearExpenses, state.yearProfit);
            default:
                console.log("Default taken!");
                return [];
        }
    }, [chartType, state]);

    // updates which chart is displayed
    const handleClick = useCallback((e) => {
        e.preventDefault();
        const type = e.target.outerText.toLowerCase();
        console.log(e);
        console.log(type);
        setChartType(type);
    }, [setChartType]);

    console.log("chartData:");
    console.log(chartData);

    return (
        <Col {...{xs: 24, lg: 12}}>
            <Card
                className="cashFlowChart"
                title={<ChartHeader title="Cash Flow" onClick={handleClick} />}
                bordered={false}
            >
                {/*@ts-ignore*/}
                <Line data={chartData} options={options}/>
            </Card>
        </Col>
    );
};

export default memo(CashFlow);
