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
    Box,
    Collapse,
    IconButton,
    Paper
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Footer from 'src/components/Footer';
import { Fragment, useEffect, useState } from 'react';
import moment from 'moment';
import { filterForExpenses, filterForRevenue, getCategoryInfo } from "./ReportHelpers";
import { capitalizeFirstLetter } from '../../../../utils/strings';
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
                <TableCell align="right">{data.total}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Category Breakdown
                            </Typography>
                            <Table size="small" aria-label="monthly-totals">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Category</TableCell>
                                        <TableCell>Transaction Count</TableCell>
                                        <TableCell>Total {data.name}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.categories.map((category) => (
                                        <TableRow key={category.name}>
                                            <TableCell component="th" scope="row">
                                                {category.name}
                                            </TableCell>
                                            <TableCell>{category.count}</TableCell>
                                            <TableCell align="right">{category.amount}</TableCell>
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


function IncomeStatement() {
    const [revenueData, setRevenueData] = useState({name: "Revenue", categories: [], total: 0});
    const [expenseData, setExpenseData] = useState({name: "Expenses", categories: [], total: 0});
    const [net, setNet] = useState(0);

    const transactions = useSelector((state: RootState) => state.transactions);

    useEffect(() => {
        if (transactions.transactions.length > 0) {
            // Get revenue and expenses
            let revenue = filterForRevenue(transactions.transactions);
            let expenses = filterForExpenses(transactions.transactions);

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
            revenueSum = roundCents(revenueSum);
            let expenseSum = 0;
            for (let i = 0; i < expenseCategoryInfo.length; i++) {
                expenseCategoryInfo[i].amount = roundCents(expenseCategoryInfo[i].amount);
                expenseSum += expenseCategoryInfo[i].amount;
            }
            expenseSum = roundCents(expenseSum);

            // Save data state (not totally synchronous!)
            setRevenueData({
                name: "Revenue",
                categories: revenueCategoryInfo,
                total: revenueSum
            });
            setExpenseData({
                name: "Expenses",
                categories: expenseCategoryInfo,
                total: expenseSum
            });
            setNet(roundCents(revenueSum - expenseSum));
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
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Breakdown</TableCell>
                                    <TableCell>Transaction Type</TableCell>
                                    <TableCell align="right">Total</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <Row data={revenueData}></Row>
                                <Row data={expenseData}></Row>
                                <TableRow>
                                    <TableCell/>
                                    <TableCell>Total</TableCell>
                                    <TableCell>{net}</TableCell>
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
