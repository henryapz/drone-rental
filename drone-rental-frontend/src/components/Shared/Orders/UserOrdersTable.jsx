import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useFormik } from 'formik';
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

function UserOrdersTable({ value, index, countShow }) {
  const [, setIsLoading] = useState(true);
  const [page, setPage] = React.useState(0);
  const user = useSelector(state => state.user.userData);
  const [pageOptions, setPageOptions] = useState({ page: page + 1, count: countShow });
  const order = useSelector(state => state.order);
  const [orderId, setOrderId] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [email, setEmail] = React.useState('');

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      orderId: '',
      status: '',
      email: '',
    },
    onSubmit: async values => {
      setOrderId(values.orderId);
      setStatus(values.status);
      setEmail(setEmail(values.email));
      dispatch(
        getOrders({
          ...pageOptions,
          token: user.token,
          orderId: values.orderId,
          status: values.status,
          email: values.email,
        }),
      );
    },
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setPageOptions({ ...pageOptions, page: newPage + 1 });
  };

  useEffect(() => {
    dispatch(getOrders({ ...pageOptions, token: user.token, orderId, status, email }));
  }, [pageOptions, dispatch, user.token, orderId, status, email]);

  useEffect(() => {
    if (order.status === 'fulfilled') setIsLoading(false);
  }, [order]);

  return (
    <Box hidden={value !== index} sx={{ width: '100%', padding: 4 }}>
      {user.role === 'Admin' && (
        <Accordion sx={{ backgroundColor: '#00b6ff17' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Filtras órdenes</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              display="flex"
              spacing={2}
              justifyContent="space-between"
            >
              <TextField
                name="orderId"
                value={formik.values.orderId}
                onChange={formik.handleChange}
                label="Id Orden"
                variant="outlined"
              />
              <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel>Estado</InputLabel>
                <Select
                  name="status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  label="Estado"
                >
                  <MenuItem value="Success">Exitoso</MenuItem>
                  <MenuItem value="Failed">Error</MenuItem>
                </Select>
              </FormControl>
              <TextField
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                label="Email"
                variant="outlined"
              />
              <Button onClick={formik.handleSubmit} variant="contained">
                Buscar
              </Button>
            </Stack>
          </AccordionDetails>
        </Accordion>
      )}
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
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[4]}
                  colSpan={5}
                  count={order.data.totalOrders}
                  rowsPerPage={pageOptions.count}
                  page={page}
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
            </TableFooter>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

UserOrdersTable.propTypes = {
  value: PropTypes.number,
  index: PropTypes.number,
  countShow: PropTypes.number,
};

UserOrdersTable.defaultProps = {
  value: -1,
  index: -1,
  countShow: 3,
};

export default UserOrdersTable;
