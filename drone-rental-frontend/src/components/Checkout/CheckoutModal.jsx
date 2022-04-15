import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { PropTypes } from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

function CheckoutModal({ open, handleRedirect }) {
  const order = useSelector(state => state.order);

  return (
    <Dialog open={open}>
      <DialogTitle>Generación de orden</DialogTitle>
      <DialogContent>
        <Box textAlign="center">
          {order.status === 'loading' && <CircularProgress color="secondary" />}
          {order.status === 'rejected' && <CancelIcon color="error" />}
          {order.status === 'fulfilled' && <CheckCircleIcon color="success" />}
          <DialogContentText textAlign="center">
            {order.status === 'loading' && 'Procesando pago'}
            {order.status === 'rejected' && 'Pago rechazado, inténtelo más tarde'}
            {order.status === 'fulfilled' && 'Pago exitoso'}
          </DialogContentText>
        </Box>
      </DialogContent>
      <DialogActions>
        {order.status === 'rejected' || order.status === 'fulfilled' ? (
          <Button onClick={handleRedirect} color="secondary">
            Ver mis órdenes
          </Button>
        ) : (
          ''
        )}
      </DialogActions>
    </Dialog>
  );
}

CheckoutModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleRedirect: PropTypes.func.isRequired,
};

export default CheckoutModal;
