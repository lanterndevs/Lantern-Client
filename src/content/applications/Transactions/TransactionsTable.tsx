import { FC, ChangeEvent, useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  CardHeader,
  Button
} from '@mui/material';

import TextField from '@mui/material/TextField';
import DateRangePicker, { DateRange } from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {Transaction, TransactionCategory } from 'src/models/transaction';
import './TransactionsTable.css'; 
import React from 'react';
import LoadingWheel from '../../pages/Components/LoadingWheel/index'


interface TransactionsTableProps {
  className?: string;
  transactions: Transaction[];
  categories: string[];
  loaded: boolean;
}

interface Filters {
  category?: TransactionCategory;
  date?: DateRange<Date>;
}

const applyFilters = (
  transactions: Transaction[],
  filters: Filters
): Transaction[] => {
  return transactions.filter((transaction) => {
    let matches = true;

    // filters the current category selected
    if (filters.category && transaction.category !== filters.category) {
      matches = false;
    }

    // filters the current date range selected
    if(filters.date[0] !== null && filters.date[1] !== null){
      let start = filters.date[0].getTime();
      let end = filters.date[1].getTime();

      let transactionDate = new Date(transaction.date).getTime();

      // checks if the transaction is within start and end bounds
      if(transactionDate >= end || transactionDate <= start){
        matches = false;
      }
    }

    return matches;
  });
};

const applyPagination = (
  transactions: Transaction[],
  page: number,
  limit: number
): Transaction[] => {
  return transactions.slice(page * limit, page * limit + limit);
};

const TransactionsTable: FC<TransactionsTableProps> = ({ transactions, categories, loaded }) => {
  // eslint-disable-next-line
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>(
    []
  );

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    category: null, date: [null, null]
  });

  const [dates, setDates] = React.useState<DateRange<Date>>([null, null]);

  const handleCateogryChange = (e: ChangeEvent<HTMLInputElement>): void => {

    let value = null;

    if (e.target.value !== 'All') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      category: value, date: dates
    }));
  };

  const handleDateSearch = (e: any): void => {

    setFilters((prevFilters) => ({
      ...prevFilters,
      date: dates
    }));
  };


  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredTransactions = applyFilters(transactions, filters);
  const paginatedTransactions = applyPagination(
    filteredTransactions,
    page,
    limit
  );

  return (
    <Card>
        <CardHeader
          action={
            <div className="cardheader">
            <Box width={300} >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateRangePicker
                  startText="Start Date"
                  endText="End Date"
                  value={dates}
                  onChange={(newValue) => {
                    setDates(newValue);
                  }}
                  renderInput={(startProps, endProps) => (
                    <React.Fragment>
                      <TextField {...startProps} />
                      <Box sx={{ mx: 2 }}> to </Box>
                      <TextField {...endProps} />
                    </React.Fragment>
                  )}
                />
            </LocalizationProvider>
            
            </Box>

            <Box mr={3}>
            <Button onClick = {handleDateSearch} variant="outlined" style={{height:'53px', width: '100px'}}>Search
            </Button>
            </Box>

            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Category</InputLabel>
                <Select
                  value={filters.category || 'All'}
                  onChange={handleCateogryChange}
                  label="Category"
                  autoWidth
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            </div>
          }
          title="Filters"
        />
      <Divider />
      <LoadingWheel loaded = {loaded}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox"></TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Transaction Name</TableCell>
              <TableCell>Source</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Category</TableCell>
            </TableRow>
          </TableHead>
          
            <TableBody>
            
              {paginatedTransactions.map((transaction) => {
                const isTransactionSelected = selectedTransactions.includes(
                  transaction.transactionID
                );
                return (
                  <TableRow
                    hover
                    key={transaction.transactionID}
                    selected={isTransactionSelected}
                  >
                    <TableCell padding="checkbox"/>
                    
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {(moment(transaction.date)).format('dddd, MMM DD YYYY')}
                      </Typography>
                      {/* <Typography variant="body2" color="text.secondary" noWrap>
                        {(moment(transaction.transactionDate)).format('dddd, MMM DD YYYY')}
                      </Typography> */}
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {transaction.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {transaction.sourceName}

                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {transaction.sourceAccount}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color={transaction.amount > 0 ? "red" : "green"}
                        gutterBottom
                        noWrap
                      >

                        {(-transaction.amount).toLocaleString('en-US', { style: 'currency', currency: transaction.currency })}

                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography	
                        variant="body1"	
                        fontWeight="bold"	
                        color="text.primary"	
                        gutterBottom	
                        noWrap	
                      >	
                        {transaction.category}	
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
              
            </TableBody>        
          
        </Table>
      </TableContainer>
      </LoadingWheel>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredTransactions.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

TransactionsTable.propTypes = {
  transactions: PropTypes.array.isRequired
};

TransactionsTable.defaultProps = {
  transactions: []
};

export default TransactionsTable;