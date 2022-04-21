import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  useTheme,
} from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../../app/slices/orderSlice';
import UserOrdersRow from './UserOrdersRow';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleBackButtonClick = event => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onPageChange(event, page + 1);
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function UserOrdersTable({ value, index }) {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = React.useState(0);
  const user = useSelector(state => state.user.userData);
  const [pageOptions, setPageOptions] = useState({ page: 1, count: 4 });
  const order = useSelector(state => state.order);
  const dispatch = useDispatch();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    dispatch(getOrders({ ...pageOptions, token: user.token }));
  }, [pageOptions, dispatch]);

  useEffect(() => {
    if (order.status === 'fulfilled') setIsLoading(false);
  }, [order]);

  return (
    <Box hidden={value !== index} sx={{ width: '100%', padding: 4 }}>
      {(!order.status || order.status === 'loading') && <p>Loading</p>}
      {order.status === 'fulfilled' && (
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Orden Id</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.data.orders.map(data => (
                <UserOrdersRow key={data._id} order={data} />
              ))}
            </TableBody>
            {/* <TableFooter>
            {console.log(order.data.totalOrders, pageOptions.count, pageOptions.page)}
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[]}
                  colSpan={3}
                  count={order.data.totalOrders}
                  rowsPerPage={pageOptions.count}
                  page={pageOptions.page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter> */}
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

UserOrdersTable.propTypes = {
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default UserOrdersTable;
