import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Box, Typography, Button } from '@mui/material';
import ProductsTable from '../../components/Shared/ShoppingCart/Productstable';
import CheckoutForm from '../../components/Checkout/CheckoutForm/CheckoutForm';

function Checkout() {
  const cartTotal = useSelector(state => state.cart.total);
  return (
    <Container sx={{ margin: '4rem auto' }}>
      <ProductsTable />
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        margin="2rem auto"
        alignItems="flex-end"
      >
        <Typography variant="h6" component="p">{`Impuestos: `}</Typography>
        <Typography variant="h6" component="p">{`Total: $${cartTotal}`}</Typography>
      </Box>
      <CheckoutForm />
      <Box width="25%" margin="2rem auto">
        <Button variant="contained" color="primary">
          Pagar
        </Button>
      </Box>
    </Container>
  );
}

export default Checkout;
