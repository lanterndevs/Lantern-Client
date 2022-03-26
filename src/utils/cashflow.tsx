import moment from "moment";
import {formatDate} from "./dates";


/**
 * Retrieves week, month, and year breakdowns and labels.
 * @param {Object[]} transactions - Array of transactions.
 * @returns {Promise<Object[]>} - The array containing the week, month, and year breakdowns and labels.
 */
async function RetrieveCashFlow(transactions) {
    const promises = [getWeekCashFlow(transactions), getMonthCashFlow(transactions), getYearCashFlow(transactions)];
    const [week, month, year] = await Promise.all(promises);
    return [week, month, year];
}

/**
 * Retrieves expenses for past week from API.
 * @param {Object[]} transactions - Array of transactions.
 * @returns {Promise<Object>} - An object with the list of tags and list of expenses (sorted in decreasing order).
 */
function getWeekCashFlow(transactions) {
    const sixDaysAgo = new Date();
    sixDaysAgo.setDate(sixDaysAgo.getDate() - 6);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return RetrieveData(sixDaysAgo, tomorrow, transactions);
}

/**
 * Retrieves expenses for past month from API.
 * @param {Object[]} transactions - Array of transactions
 * @returns {Promise<Object>} - An object with the list of tags and list of expenses (sorted in decreasing order).
 */
function getMonthCashFlow(transactions) {
    const fiveWeeksAgo = new Date();
    fiveWeeksAgo.setDate(fiveWeeksAgo.getDate() - 5 * 7);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return RetrieveData(fiveWeeksAgo, tomorrow, transactions);
}

/**
 * Retrieves expenses for past year from API.
 *
 * @param {Object[]} transactions - Array of transactions
 * @returns {Promise<Object>} - An object with the list of tags and list of expenses (sorted in decreasing order).
 */
function getYearCashFlow(transactions) {
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setDate(1);
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 11);
    const nextMonth = new Date();
    nextMonth.setFullYear(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 1);
    return RetrieveData(twelveMonthsAgo, nextMonth, transactions);
}

/**
 * Retrieves data for all accounts between start date and end date.
 *
 * @param {Date} start - The starting date.
 * @param {Date} end - The ending date.
 * @param {Object[]} transactions - Array of transactions.
 * @returns {Promise<Object>} - An object with the list of tags and list of expenses (sorted in decreasing order).
 */
async function RetrieveData(start, end, transactions) {

    console.log(transactions);

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

    // reformats the dates
    dates.forEach((date, index) => {
        dates[index] = moment(date).format('ll');
      });

    return { revenue: revenue, expenses: expenses, profit: profit, labels: dates };
}

export { RetrieveCashFlow };
