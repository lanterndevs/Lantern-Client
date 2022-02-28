import axios from "axios";
import {getCookie} from "./cookies";
import {formatDate} from "./dates";

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
    let transactions = [];
    // Get auth cookie
    let authToken = getCookie(document.cookie, "auth_token");
    await axios.get('/api/transactions', {
        headers: {
            authorization: 'Bearer ' + authToken,
        }
    }).then(res => {
        transactions = res.data;
    }).catch(error => {
        // console.log(error);
        return error;
    });

    // console.log("Got transactions:");
    // console.log(transactions);

    // Generate date range
    let currentDate = start;
    let dates = [];
    while (currentDate <= end) {
        dates.push(formatDate(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    let revenue = new Array(dates.length).fill(0);
    let expenses = new Array(dates.length).fill(0);

    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].amount <= 0) { // REVENUE
            revenue[dates.indexOf(transactions[i].date)] += (transactions[i].amount * -1);
        } else { // EXPENSE
            expenses[dates.indexOf(transactions[i].date)] += transactions[i].amount;
        }
    }

    // Now compute profits
    let profit = new Array(dates.length).fill(0);
    for (let i = 0; i < dates.length; i++) {
        profit[i] = revenue[i] - expenses[i];
    }

    return { revenue: revenue, expenses: expenses, profit: profit, labels: dates };
}

export {
    retrieveCashFlow
};
