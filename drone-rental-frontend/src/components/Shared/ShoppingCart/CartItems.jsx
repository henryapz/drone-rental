import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addElements,
  deleteElement,
  substractToElement,
} from '../../../app/slices/cartSlice';

function CartItems() {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleRemove = element => {
    dispatch(deleteElement(element));
  };

  const handleAddQuantity = element => {
    dispatch(addElements(element));
  };

  const handleSubstractQuantity = element => {
    dispatch(substractToElement(element));
  };

  return (
    <>
      {cart.products.map(element => (
        <Card
          key={element.ref}
          style={{
            border: 'none',
            boxShadow: 'none',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <CardMedia
            component="img"
            sx={{ width: '25%', objectFit: 'contain', flex: '1 1 0' }}
            image={element.image}
            alt="Item"
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: '3 1 0' }}>
            <CardContent sx={{ flex: '1 1 0' }}>
              <Typography variant="subtitle1">{element.ref}</Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {element.initialDate} - {element.finalDate}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Días alquilados: {element.days}
              </Typography>
            </CardContent>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1 1 0' }}>
            <CardContent sx={{ flex: '1 1 0' }}>
              <Typography variant="body1" color="text.secondary" component="div">
                ${element.subtotal}
              </Typography>
            </CardContent>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1 1 0' }}>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: { xs: 'row', sm: 'column', md: 'column' },
                margin: 'auto',
                flex: '1 1 0',
              }}
            >
              <Box textAlign="center">
                <IconButton
                  onClick={() => handleRemove(element)}
                  aria-label="delete"
                  size="small"
                  color="error"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
              <Divider light />
              <Box sx={{ display: 'flex' }}>
                <IconButton
                  onClick={() => handleAddQuantity(element)}
                  variant="outlined"
                  size="small"
                  color="primary"
                >
                  <AddIcon />
                </IconButton>
                <Typography variant="subtitle1" paddingX={2}>
                  {element.quantity}
                </Typography>
                <IconButton
                  onClick={() => handleSubstractQuantity(element)}
                  variant="outlined"
                  size="small"
                  color="primary"
                >
                  <RemoveIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Box>
        </Card>
      ))}
    </>
  );
}

export default CartItems;
