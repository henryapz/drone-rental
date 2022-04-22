import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { PropTypes } from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

function CheckoutModal({ open, setOpen, handleRedirect }) {
  const order = useSelector(state => state.order);

  return (
    <Dialog open={open}>
      <DialogTitle>Generación de orden</DialogTitle>
      <DialogContent>
        <Box textAlign="center">
          {order.status === 'loading' && <CircularProgress color="secondary" />}
          {(order.status === 'rejected' ||
            (order.status === 'fulfilled' && !order.data.success)) && (
            <CancelIcon color="error" />
          )}
          {order.status === 'fulfilled' && order.data.success && (
            <CheckCircleIcon color="success" />
          )}
          <DialogContentText textAlign="center">
            {order.status === 'loading' && 'Procesando pago'}
            {order.status === 'rejected' &&
              'Pago rechazado, error en la validación de tarjeta'}
            {order.status === 'fulfilled' &&
              !order.data.success &&
              'Pago rechazado, inténtelo más tarde'}
            {order.status === 'fulfilled' &&
              order.data.success &&
              'Orden generada exitosamente'}
          </DialogContentText>
        </Box>
      </DialogContent>
      <DialogActions>
        {(order.status === 'rejected' ||
          (order.status === 'fulfilled' && !order.data.success)) && (
          <Button onClick={setOpen} color="secondary">
            Volver
          </Button>
        )}
        {order.status === 'rejected' || order.status === 'fulfilled' ? (
          <Button onClick={() => handleRedirect(order.data.success)} color="secondary">
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
  setOpen: PropTypes.func.isRequired,
  handleRedirect: PropTypes.func.isRequired,
};

export default CheckoutModal;
