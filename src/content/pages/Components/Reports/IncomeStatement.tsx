import {
    Container,
    Grid,
    ButtonGroup,
    Button,
    Table,
    TableCell,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Box
} from '@mui/material';
import Footer from 'src/components/Footer';
import { useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';
import moment from 'moment';
import { filterForExpenses, filterForRevenue, getCount } from "./ReportHelpers";
import { capitalizeFirstLetter } from '../../../../utils/strings';
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux";

function IncomeStatement() {
    const [revenueCategories, setRevenueCategories] = useState([]);
    const [expenseCategories, setExpenseCategories] = useState([]);
    const [net, setNet] = useState(0);

    const transactions = useSelector((state: RootState) => state.transactions);

    useEffect(() => {
        if (!transactions.loading) {
            // Get revenue and expenses
            let revenue = filterForRevenue(transactions.transactions);
            let expenses = filterForExpenses(transactions.transactions);

            // Get and set categories
            setRevenueCategories(getCount(revenue));
            setExpenseCategories(getCount(expenses));

            // computes the total number of transactions made
            let total = 0;
            categoryData.forEach((category) => {
                total += category[1];
            });
            setTotal(total);

            // Converts category data to array of objects
            let categoryObject = categoryData.map(([name, value]) => ({
                name,
                value
            }));

            // stores array of categories into variable
            setCategories(categoryObject);

            // sorts the category list from highest to least
            categoryObject.sort((a, b) => {
                return b.value - a.value;
            });

            // computes the largest transaction from transactions
            const largestTransaction = transactions.reduce((a, b) =>
                Math.abs(a.amount) > Math.abs(b.amount) ? a : b
            );

            // stores detailed breakdown into an object
            setDetailed({
                totalTransactions: transactions.length.toString(),
                highestCategory: categoryObject[0].name,
                leastCategory: categoryObject[categoryObject.length - 1].name,
                frequentTransactions: getFrequent(transactions),
                largestTransaction: [
                    largestTransaction.name,
                    largestTransaction.amount,
                    largestTransaction.date
                ]
            });
        }
    }, [transactions]);

    return (
        <>
            <ButtonGroup
                size="medium"
                sx={{
                    justifyContent: 'right',
                    display: 'flex',
                    marginRight: '25px',
                    marginBottom: '25px'
                }}
            >
                <Button variant="outlined" name="Chart">
                    Day
                </Button>
                <Button variant="outlined" name="Normal">
                    Week
                </Button>
                <Button variant="outlined" name="Normal">
                    Year
                </Button>
            </ButtonGroup>

            <Container maxWidth="lg">
                <Grid
                    container
                    direction="row"
                    justifyContent="left"
                    alignItems="stretch"
                    spacing={1}
                >
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Category</TableCell>
                                    <TableCell>
                                        Percentage of Total {capitalizeFirstLetter(typeString)}s
                                    </TableCell>
                                    <TableCell>
                                        Number of {capitalizeFirstLetter(typeString)}s
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {categories.map((category) => (
                                    <TableRow
                                        key={category.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <Typography
                                                variant="body1"
                                                fontWeight="bold"
                                                color="text.primary"
                                                gutterBottom
                                                noWrap
                                            >
                                                {/* Displays the name of the category */}
                                                {category.name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            {/* Displays the percentage that the category makes up */}
                                            <ProgressBar
                                                done={((category.value / total) * 100).toFixed(2)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                variant="body1"
                                                fontWeight="bold"
                                                color="text.primary"
                                                gutterBottom
                                                noWrap
                                            >
                                                {category.value}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box sx={{ mt: 5 }}>
                        <Typography
                            variant="h3"
                            fontWeight="bold"
                            color="text.primary"
                            gutterBottom
                            noWrap
                        >
                            Detailed Report
                        </Typography>
                        <hr style={{ borderTop: '2px solid black' }} />
                        <div style={{ lineHeight: '300%' }}>
                            <b>Total Transactions over Time Span:</b>{' '}
                            {detailed.totalTransactions} <br />
                            <b>
                                Highest Categorized {capitalizeFirstLetter(typeString)}:
                            </b>{' '}
                            {detailed.highestCategory} <br />
                            <b>Least Categorized {capitalizeFirstLetter(typeString)}:</b>{' '}
                            {detailed.leastCategory} <br />
                            <b>Largest Transaction:</b>{' '}
                            {detailed.largestTransaction.length ? (
                                <div>
                                    &emsp;&emsp;Name: {detailed.largestTransaction[0]}
                                    <br /> &emsp;&emsp;Date:{' '}
                                    {moment(detailed.largestTransaction[2]).format(
                                        'dddd MMMM DD, YYYY'
                                    )}
                                    <br /> &emsp;&emsp;Amount:{' '}
                                    {detailed.largestTransaction[1].toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD'
                                    })}
                                </div>
                            ) : (
                                <br />
                            )}
                            <b>Most Frequent Transaction:</b>{' '}
                            {detailed.frequentTransactions[0]}
                            {', '}
                            {detailed.frequentTransactions.length
                                ? '(' +
                                detailed.frequentTransactions[1] +
                                ' Total Transactions)'
                                : ' '}
                        </div>
                    </Box>
                </Grid>
            </Container>
            <Footer />
        </>
    );
}

export default TransactionBreakdown;
