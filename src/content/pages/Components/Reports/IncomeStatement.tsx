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
    Box,
    Collapse,
    IconButton,
    Paper
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Footer from 'src/components/Footer';
import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {filterForExpenses, filterForRevenue, filterForYear, getCategoryInfo} from "./ReportHelpers";
import { roundCents } from '../../../../utils/money';
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux";

function Row(props) {
    const [open, setOpen] = useState(false);
    let data = props.data;
    console.log(data);

    return (
        <Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {data.name}
                </TableCell>
                <TableCell align="center">{data.total}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Table size="small" aria-label="monthly-totals">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Category</TableCell>
                                        <TableCell>Count</TableCell>
                                        <TableCell>Total {data.name} ($)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.categories.map((category) => (
                                        <TableRow key={category.name}>
                                            <TableCell component="th" scope="row">{category.name}</TableCell>
                                            <TableCell>{category.count}</TableCell>
                                            <TableCell>{category.amount}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

let currentYear = (new Date()).getFullYear();

function IncomeStatement() {
    const [statementData, setStatementData] = useState({
        revenue: {name: "Revenue", categories: [], total: 0},
        expenses: {name: "Expenses", categories: [], total: 0},
        net: {name: "Net Income", total: 0}
    });
    const [statementYear, setStatementYear] = useState(currentYear);
    const transactions = useSelector((state: RootState) => state.transactions);

    // updates which chart is displayed
    const handleClick = useCallback(
        (e) => {
            e.preventDefault();
            const year = parseInt(e.target.outerText);
            setStatementYear(year);
        },
        [setStatementYear]
    );

    useEffect(() => {
        if (transactions.transactions.length > 0) {
            let yearTransactions = filterForYear(transactions.transactions, statementYear)

            // Get revenue and expenses
            let revenue = filterForRevenue(yearTransactions);
            let expenses = filterForExpenses(yearTransactions);

            // Get category info
            let revenueCategoryInfo = getCategoryInfo(revenue);
            let expenseCategoryInfo = getCategoryInfo(expenses);

            // Ensure amounts are rounded to the closest cent (in the case of floating point error)
            // Additionally, add "Total" category containing sum
            let revenueSum = 0;
            for (let i = 0; i < revenueCategoryInfo.length; i++) {
                revenueCategoryInfo[i].amount = roundCents(revenueCategoryInfo[i].amount);
                revenueSum += revenueCategoryInfo[i].amount;
            }
            revenueSum = roundCents(revenueSum * -1);
            let expenseSum = 0;
            for (let i = 0; i < expenseCategoryInfo.length; i++) {
                expenseCategoryInfo[i].amount = roundCents(expenseCategoryInfo[i].amount);
                expenseSum += expenseCategoryInfo[i].amount;
            }
            expenseSum = roundCents(expenseSum);

            // Save data state (not totally synchronous!)
            setStatementData({
                revenue: {
                    name: "Revenue",
                    categories: revenueCategoryInfo,
                    total: revenueSum
                },
                expenses: {
                    name: "Expenses",
                    categories: expenseCategoryInfo,
                    total: expenseSum
                },
                net: {
                    name: "Net Income",
                    total: roundCents(revenueSum - expenseSum)
                }
            });
        }
    }, [transactions, statementYear]);

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'right',
                    alignItems: 'right',
                    marginBottom: '20px'
                }}
            >
                <ButtonGroup size="medium">
                    <Button variant="outlined" onClick={handleClick} name="week">
                        {currentYear - 2}
                    </Button>
                    <Button variant="outlined" onClick={handleClick} name="month">
                        {currentYear - 1}
                    </Button>
                    <Button variant="outlined" onClick={handleClick} name="year">
                        {currentYear}
                    </Button>
                </ButtonGroup>
            </div>
            <Container maxWidth="lg">
                <Grid
                    container
                    direction="row"
                    justifyContent="left"
                    alignItems="stretch"
                    spacing={1}
                >
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Breakdown</TableCell>
                                    <TableCell>Transaction Type</TableCell>
                                    <TableCell align="center">Total ($)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <Row data={statementData.revenue}></Row>
                                <Row data={statementData.expenses}></Row>
                                <TableRow>
                                    <TableCell>{statementData.net.name}</TableCell>
                                    <TableCell/>
                                    <TableCell align="center">{statementData.net.total}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Container>
            <Footer />
        </>
    );
}

export default IncomeStatement;
