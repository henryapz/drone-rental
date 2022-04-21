import { Box, CardMedia, Drawer, Typography } from '@mui/material';
import React from 'react';
import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';
import CartItems from './CartItems';
import Empty from '../../../assets/images/empty-cart.png';
import CartTotal from './ItemsTotal';

function CartDrawer({ open, handleClose }) {
  const cart = useSelector(state => state.cart);
  return (
    <div>
      <Drawer anchor="right" open={open} onClose={handleClose}>
        <Box sx={{ width: { xs: 300, sm: 500, md: 600 }, m: 2 }}>
          <Typography variant="h6" align="center">
            Mi Carrito
          </Typography>
          {cart.products.length ? (
            <Box>
              <CartItems />
              <CartTotal isCart handleClose={handleClose} />
            </Box>
          ) : (
            <Box>
              <CardMedia
                component="img"
                sx={{ margin: 'auto', width: '30%', objectFit: 'contain', paddingY: 2 }}
                image={Empty}
                title="Empty cart"
              />
              <Typography variant="subtitle2" align="center">
                Tu carrito se encuentra vacío.
              </Typography>
            </Box>
          )}
        </Box>
      </Drawer>
    </div>
  );
}

CartDrawer.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

CartDrawer.defaultProps = {
  open: false,
  handleClose: () => {},
};

export default CartDrawer;
