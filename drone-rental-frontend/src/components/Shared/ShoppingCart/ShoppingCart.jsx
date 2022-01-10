import React from 'react';
import { Box, Button, Typography, Modal } from '@mui/material';
import { PropTypes } from 'prop-types';
import styles from './ShoppingCart.module.scss';
import DatePicker from '../DatePicker/DatePicker';

function ShoppingCart({ open, handleClose }) {
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
          <Typography>Seleccione rango de fechas</Typography>
          <DatePicker />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
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
