import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { PropTypes } from 'prop-types';
import React from 'react';
import moment from 'moment';

function UserOrdersRow({ order }) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {order._id}
        </TableCell>
        <TableCell>{moment(new Date(order.createdAt)).format('YYYY-MM-DD')}</TableCell>
        <TableCell>${order.total.toFixed(2)}</TableCell>
        <TableCell>
          {order.transactionStatus === 'Success' ? 'Éxitoso' : 'Error'}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ paddingY: 4 }}>
              <Typography variant="h6" gutterBottom component="div">
                Detalle
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Modelo</TableCell>
                    <TableCell>Cantidad</TableCell>
                    <TableCell>Fecha Inicio</TableCell>
                    <TableCell>Fecha Fin</TableCell>
                    <TableCell>Días</TableCell>
                    <TableCell>P/U</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.items.map(item => (
                    <TableRow key={item.droneId.model}>
                      <TableCell>{item.droneId.model}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        {moment(new Date(item.startDate)).format('YYYY-MM-DD')}
                      </TableCell>
                      <TableCell>
                        {moment(new Date(item.endDate)).format('YYYY-MM-DD')}
                      </TableCell>
                      <TableCell>
                        {new Date(item.endDate).getDate() -
                          new Date(item.startDate).getDate() +
                          1}
                      </TableCell>
                      <TableCell>${item.amount.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell rowSpan={2} />
                    <TableCell rowSpan={2} />
                    <TableCell rowSpan={2} />
                    <TableCell rowSpan={2} />
                    <TableCell>Delivery</TableCell>
                    <TableCell>$5.5</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

UserOrdersRow.propTypes = {
  order: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    transactionStatus: PropTypes.string.isRequired,
    items: PropTypes.instanceOf(Array).isRequired,
  }).isRequired,
};

export default UserOrdersRow;
