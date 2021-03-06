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
import React, {useCallback, useEffect, useState} from 'react';
import ProgressBar from './ProgressBar';
import moment from 'moment';
import {filterForYear, getCategoryInfo, getFrequent} from './ReportHelpers';
import { capitalizeFirstLetter } from '../../../../utils/strings';

let currentYear = (new Date()).getFullYear();

function TransactionBreakdown(transactions, typeString) {
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);
  const [transactionYear, setTransactionYear] = useState(currentYear);

  // eslint-disable-next-line
  const [detailed, setDetailed] = useState({
    totalTransactions: '',
    highestCategory: '',
    leastCategory: '',
    frequentTransactions: [],
    largestTransaction: []
  });

  // updates which chart is displayed
  const handleClick = useCallback(
      (e) => {
        e.preventDefault();
        const year = parseInt(e.target.outerText);
        setTransactionYear(year);
      },
      [setTransactionYear]
  );

  useEffect(() => {
    if (transactions.length > 0) {
      let yearTransactions = filterForYear(transactions, transactionYear);

      // Get category breakdown data
      let categoryInfo = getCategoryInfo(yearTransactions);

      // computes the total across all categories
      let total = 0;
      categoryInfo.forEach((category) => {
        total += category.amount;
      });
      setTotal(total);

      // stores array of categories into variable
      setCategories(categoryInfo);

      // sorts the category list from highest to least
      categoryInfo.sort((a, b) => {
        return Math.abs(b.amount) - Math.abs(a.amount);
      });

      // computes the largest transaction from transactions
      const largestTransaction = yearTransactions.reduce((a, b) =>
          Math.abs(a.amount) > Math.abs(b.amount) ? a : b
      );

      // stores detailed breakdown into an object
      setDetailed({
        totalTransactions: yearTransactions.length.toString(),
        highestCategory: categoryInfo[0].name,
        leastCategory: categoryInfo[categoryInfo.length - 1].name,
        frequentTransactions: getFrequent(yearTransactions),
        largestTransaction: [
          largestTransaction.name,
          largestTransaction.amount,
          largestTransaction.date
        ]
      });
      console.log(categoryInfo);
    }
  }, [transactions, transactionYear]);

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
                              done={((category.amount / total) * 100).toFixed(2)}
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
                            {category.count}
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
