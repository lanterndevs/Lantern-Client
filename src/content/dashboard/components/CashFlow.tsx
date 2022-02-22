import { Card, Col, Skeleton } from 'antd';
import React, { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';

import ChartHeader from "./ChartHeader";
import { data, options, retrieveBreakdown } from '../../utils/charts/breakdown';

const CashFlow = () => {
    const [chartType, setChartType] = useState('month');
    const [state, setState] =
        useState({
            weekCashFlow: [],
            weekLabels: [],
            monthCashFlow: [],
            monthLabels: [],
            yearCashFlow: [],
            yearLabels: [],
        });

    // retrieves cashflow if component did mount
    useEffect(() => {
        retrieveCashFlow().then(([week, month, year]) => {
                setState({
                    weekCashFlow: week.cashflow,
                    weekLabels: week.labels,
                    monthCashFlow: month.cashflow,
                    monthLabels: month.labels,
                    yearCashFlow: year.cashflow,
                    yearLabels: year.labels,
                });
            });
    }, []);

    // data for the current chart type
    const chartData = useMemo(() => {
        switch (chartType) {
            case 'week':
                return data(state.weekLabels, state.weekCashFlow);
            case 'month':
                return data(state.monthLabels, state.monthCashFlow);
            case 'year':
                return data(state.yearLabels, state.yearCashFlow);
            default:
                return [];
        }
    }, [chartType, state]);

    // updates which chart is displayed
    const handleClick = useCallback((e) => {
        e.preventDefault();
        const type = e.target.name;
        setChartType(type);
    }, [setChartType]);

    return (
        <Col {...{xs: 24, lg: 12}}>
            <Card
                className="cashFlowChart"
                title={<ChartHeader title="Cash Flow" onClick={handleClick} />}
                bordered={false}
            >
                <Line data={chartData} options={options}/>
            </Card>
        </Col>
    );
};

export default memo(CashFlow);
