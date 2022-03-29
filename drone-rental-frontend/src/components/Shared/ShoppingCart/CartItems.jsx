import { Box, Card, CardContent, CardMedia, Container, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

function CartItems() {
  const cart = useSelector(state => state.cart);
  return (
    <>
      {cart.products.map(element => (
        <Card style={{ border: 'none', boxShadow: 'none' }}>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={element.image}
            alt="Item"
          />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h6">
                {element.ref}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary" component="div">
                {element.initialDate} - {element.finalDate}
              </Typography>
            </CardContent>
          </Box>
        </Card>
      ))}
    </>
  );
}

export default CartItems;
