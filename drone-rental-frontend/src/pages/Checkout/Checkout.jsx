import React from 'react';
// import { useSelector } from 'react-redux';
import { Container, Box, Typography } from '@mui/material';
import CheckoutForm from '../../components/Checkout/CheckoutForm';
import CheckoutProducts from '../../components/Checkout/CheckoutProducts';

function Checkout() {
  // const cartTotal = useSelector(state => state.cart.total);
  return (
    <Container sx={{ margin: '2rem auto' }}>
      <Typography variant="h4" align="center" paddingBottom={3}>
        Checkout
      </Typography>
      <Box sx={{ display: { xs: 'block', sm: 'block', md: 'flex' }, gap: '10px' }}>
        <CheckoutForm />
        <CheckoutProducts />
      </Box>
    </Container>
  );
}

export default Checkout;
