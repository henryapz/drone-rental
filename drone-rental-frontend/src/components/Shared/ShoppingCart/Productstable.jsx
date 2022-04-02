import React from 'react';
import { useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material';

function Productstable() {
  const cart = useSelector(state => state.cart);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Modelo/Ref</TableCell>
            <TableCell align="right">Fecha inicio</TableCell>
            <TableCell align="right">Fecha fin</TableCell>
            <TableCell align="right">Dias</TableCell>
            <TableCell align="right">Unidades</TableCell>
            <TableCell align="right">Precio</TableCell>
            <TableCell align="right">Subtotal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody id="cart-content">
          {cart.products.map(element => (
            <TableRow
              key={nanoid()}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {element.ref}
              </TableCell>
              <TableCell align="right">{element.initialDate}</TableCell>
              <TableCell align="right">{element.finalDate}</TableCell>
              <TableCell align="right">{element.days}</TableCell>
              <TableCell align="right">{element.quantity}</TableCell>
              <TableCell align="right">{`$${element.price}`}</TableCell>
              <TableCell align="right">{`$${element.subtotal}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Productstable;
