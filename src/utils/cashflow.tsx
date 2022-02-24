import axios from "axios";
import {getCookie} from "./cookies";

/**
 * Returns data for chart.
 *
 * @param {Array} labels - The labels for cashflow (revenue, expenses, net).
 * @param {Array} data - The dollar amounts of each type.
 * @returns {Object} - The data object.
 */
const data = (labels, data) => {
    return {
        datasets: [{
            backgroundColor: '#ffffff',
            borderWidth: 0,
            data: data,
            hoverBackgroundColor: '#ffffff'
        }],
        labels: labels
    }
};

/**
 * The options for the chart.
 *
 * @type Object
 */
const options = {
    cutoutPercentage: 70,
    layout: {
        padding: {
            bottom: 20,
            left: 0,
            right: 0,
            top: 40
        }
    },
    legend: {
        labels: {
            boxWidth: 7,
            usePointStyle: true
        },
        onClick: null,
        position: 'right'
    },
    tooltips: {
        backgroundColor: '#ffffff',
        bodyAlign: 'center',
        bodyFontColor: '#000000',
        callbacks: {
            label: (tooltip, object) => {
                const data = object.datasets[tooltip.datasetIndex].data;
                const total = data.reduce((acc, dataPoint) => {
                    return acc + dataPoint
                });
                const category = data[tooltip.index];
                return (category / total * 100).toFixed(1) + '%';
            },
            title: (tooltipArray, object) => {
                return object.labels[tooltipArray[0].index] + ':';
            },
        },
        displayColors: false,
        titleAlign: 'center',
        titleFontColor: '#000000',
        xAlign: 'center',
        yAlign: 'bottom',
    }
};

/**
 * Retrieves week, month, and year breakdowns and labels.
 *
 * @returns {Promise<Object[]>} - The array containing the week, month, and year breakdowns and labels.
 */
async function retrieveCashFlow() {
    const promises = [getWeekCashFlow(), getMonthCashFlow(), getYearCashFlow()];
    const [week, month, year] = await Promise.all(promises);
    return [week, month, year];
}

/**
 * Retrieves expenses for past week from API.
 *
 * @returns {Promise<Object>} - An object with the list of tags and list of expenses (sorted in decreasing order).
 */
function getWeekCashFlow() {
    const sixDaysAgo = new Date();
    sixDaysAgo.setDate(sixDaysAgo.getDate() - 6);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return retrieveData(sixDaysAgo, tomorrow);
}

/**
 * Retrieves expenses for past month from API.
 *
 * @returns {Promise<Object>} - An object with the list of tags and list of expenses (sorted in decreasing order).
 */
function getMonthCashFlow() {
    const fiveWeeksAgo = new Date();
    fiveWeeksAgo.setDate(fiveWeeksAgo.getDate() - 5 * 7);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return retrieveData(fiveWeeksAgo, tomorrow);
}

/**
 * Retrieves expenses for past year from API.
 *
 * @returns {Promise<Object>} - An object with the list of tags and list of expenses (sorted in decreasing order).
 */
function getYearCashFlow() {
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setDate(1);
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 11);
    const nextMonth = new Date();
    nextMonth.setFullYear(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 1);
    return retrieveData(twelveMonthsAgo, nextMonth);
}

/**
 * Retrieves data for all accounts between start date and end date.
 *
 * @param {Date} start - The starting date.
 * @param {Date} end - The ending date.
 * @returns {Promise<Object>} - An object with the list of tags and list of expenses (sorted in decreasing order).
 */
async function retrieveData(start, end) {
    let transactions;
    // Get auth cookie
    let authToken = getCookie(document.cookie, "auth_token");
    console.log("authToken retrieved from cookies:");
    console.log(authToken);
    await axios.get('/api/transactions', {
        headers: {
            authorization: 'Bearer ' + authToken,
        }
    }).then(res => {
        transactions = res.data;
    }).catch(error => {
        console.log(error);
        return error;
    });

    console.log("Transactions:");
    console.log(transactions.length);
    console.log(transactions);

    let flow = [];
    let dates = [];
    for (let i = 0; i < transactions.length; i++) {
        flow.push(transactions[i].amount);
        dates.push(transactions[i].date);
    }
    console.log("flow and dates:");
    console.log(flow.length);
    console.log(dates.length);
    console.log(flow);
    console.log(dates);
    return { cashflow: flow, labels: dates };
}

export {
    data,
    options,
    retrieveCashFlow,
};
