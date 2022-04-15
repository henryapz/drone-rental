import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CardMedia,
  Paper,
  Typography,
} from '@mui/material';
import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector } from 'react-redux';
import CartTotal from '../Shared/ShoppingCart/ItemsTotal';

function CheckoutProducts() {
  const cart = useSelector(state => state.cart);

  return (
    <Paper
      sx={{
        maxHeight: '350px',
        overflow: 'auto',
        flex: '1 1 0',
        padding: 3,
        textAlign: 'center',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Detalle Pedido
      </Typography>
      <Box sx={{ marginBottom: 2 }}>
        {cart.products.map(product => (
          <Accordion key={product.ref}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
              >
                <Typography>{product.ref}</Typography>
                <Typography color="text.secondary">$ {product.subtotal}</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ display: 'flex', alignItems: 'center' }}>
              <CardMedia
                component="img"
                sx={{ width: '20%', objectFit: 'contain', paddingRight: 2 }}
                image={product.image}
                alt="Item"
              />
              <Box textAlign="left">
                <Typography variant="body2" color="text.secondary">
                  {product.initialDate} - {product.finalDate}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Días alquilados: {product.days}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Precio: {product.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Cantidad: {product.quantity}
                </Typography>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
      <CartTotal />
    </Paper>
  );
}

export default CheckoutProducts;
