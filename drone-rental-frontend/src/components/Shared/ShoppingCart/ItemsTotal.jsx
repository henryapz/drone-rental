import { Box, Button, Divider, Typography } from '@mui/material';
import React from 'react';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetCart } from '../../../app/slices/cartSlice';
import { cartTotalSelector } from '../../../app/selectors/cartSelector';
import { openLogInModal } from '../../../app/slices/userSlice';

function CartTotal({ isCart, handleClose }) {
  const total = useSelector(cartTotalSelector);
  const delivery = useSelector(state => state.cart.delivery);
  const user = useSelector(state => state.user.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    dispatch(resetCart());
  };

  const handleCheckout = () => {
    if (!user || !user.token) {
      dispatch(openLogInModal(true));
      return;
    }
    handleClose();
    navigate('../checkout');
  };
  return (
    <>
      <Divider light />
      <Box
        width="100%"
        display="flex"
        justifyContent="space-between"
        padding="5px 30px"
        boxSizing="border-box"
      >
        <Typography variant="subtitle1" component="span">
          Subtotal
        </Typography>
        <Typography variant="subtitle1" component="span">
          $ {total}
        </Typography>
      </Box>
      <Box
        width="100%"
        display="flex"
        justifyContent="space-between"
        padding="5px 30px"
        boxSizing="border-box"
      >
        <Typography variant="subtitle1">Delivery</Typography>
        <Typography variant="subtitle1">$ {delivery}</Typography>
      </Box>
      <Box
        width="100%"
        display="flex"
        justifyContent="space-between"
        padding="5px 30px"
        boxSizing="border-box"
      >
        <Typography variant="subtitle1" fontWeight="bold">
          Total a pagar
        </Typography>
        <Typography variant="subtitle1" fontWeight="bold">
          $ {total + delivery}
        </Typography>
      </Box>
      {isCart && (
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          padding="5px 30px"
          boxSizing="border-box"
        >
          <Button variant="contained" color="primary" onClick={handleCheckout}>
            Alquilar
          </Button>
          <Button variant="contained" color="secondary" onClick={handleDelete}>
            Eliminar
          </Button>
        </Box>
      )}
    </>
  );
}

CartTotal.propTypes = {
  isCart: PropTypes.bool,
  handleClose: PropTypes.func,
};

CartTotal.defaultProps = {
  isCart: false,
  handleClose: () => {},
};

export default CartTotal;
