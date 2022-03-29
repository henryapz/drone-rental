import { Box, Divider, Drawer, List, ListItem, Typography } from '@mui/material';
import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';
import CartItems from './CartItems';

function CartDrawer({ open, handleClose }) {
  const cartTotal = useSelector(state => state.cart.total);

  return (
    <div>
      <Drawer anchor="right" open={open} onClose={handleClose}>
        <Box sx={{ width: 500, m: 2 }}>
          <Typography variant="h6" align="center">
            Mi Carrito
          </Typography>
          <CartItems />
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
