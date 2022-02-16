import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, Typography, Modal } from '@mui/material';
import { PropTypes } from 'prop-types';
import styles from './ShoppingCart.module.scss';
import Productstable from './Productstable';

function ShoppingCart({ open, handleClose }) {
  const cartTotal = useSelector(state => state.cart.total);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box p="0.875rem" className={styles.modal__container}>
        <Box m="0 0.5rem" className={styles.modal__clsBtnContainer}>
          <Button variant="outlined" size="large" onClick={handleClose}>
            X
          </Button>
        </Box>
        <Box className={styles.modal__content}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Items agregados
          </Typography>
          <Productstable />
        </Box>
        <Box width="100%" display="flex" justifyContent="flex-end">
          <Typography variant="h6" component="p">{`Total: ${cartTotal}`}</Typography>
        </Box>

        <Box className={styles.modal__checkoutBtnsContainer}>
          <Button variant="contained" color="primary">
            Comprar
          </Button>
          <Button variant="contained" color="secondary">
            Eliminar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

ShoppingCart.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

ShoppingCart.defaultProps = {
  open: false,
  handleClose: () => {},
};

export default ShoppingCart;
