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
import moment from 'moment';
import { filterForExpenses, filterForRevenue, getCategoryInfo } from "./ReportHelpers";
import { capitalizeFirstLetter } from '../../../../utils/strings';
import { roundCents } from '../../../../utils/money';
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux";

function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
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
                    {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                History
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Customer</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                        <TableCell align="right">Total price ($)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history.map((historyRow) => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.date}
                                            </TableCell>
                                            <TableCell>{historyRow.customerId}</TableCell>
                                            <TableCell align="right">{historyRow.amount}</TableCell>
                                            <TableCell align="right">
                                                {Math.round(historyRow.amount * row.price * 100) / 100}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}


function IncomeStatement() {
    const [revenueCategories, setRevenueCategories] = useState([]);
    const [expenseCategories, setExpenseCategories] = useState([]);
    const [net, setNet] = useState(0);

    const transactions = useSelector((state: RootState) => state.transactions);

    useEffect(() => {
        if (transactions.transactions.length > 0) {
            // Get revenue and expenses
            let revenue = filterForRevenue(transactions.transactions);
            let expenses = filterForExpenses(transactions.transactions);

            // Get category info
            let revenueCategories = getCategoryInfo(revenue);
            let expenseCategories = getCategoryInfo(expenses);

            // Ensure amounts are rounded to the closest cent (in the case of floating point error)
            // Additionally, add "Total" category containing sum
            let revenueSum = 0;
            for (let i = 0; i < revenueCategories.length; i++) {
                revenueCategories[i][2] = roundCents(revenueCategories[i][2]);
                revenueSum += revenueCategories[i][2];
            }
            revenueSum = roundCents(revenueSum);
            revenueCategories.push(["Total", 1, revenueSum]);
            let expenseSum = 0;
            for (let i = 0; i < expenseCategories.length; i++) {
                expenseCategories[i][2] = roundCents(expenseCategories[i][2]);
                expenseSum += expenseCategories[i][2];
            }
            expenseSum = roundCents(expenseSum);
            expenseCategories.push(["Total", 1, expenseSum]);

            console.log(revenueCategories);
            console.log(expenseCategories);

            // Save categories state (not totally synchronous!)
            setRevenueCategories(revenueCategories);
            setExpenseCategories(expenseCategories);
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

                </Grid>
            </Container>
            <Footer />
        </>
    );
}

export default IncomeStatement;
