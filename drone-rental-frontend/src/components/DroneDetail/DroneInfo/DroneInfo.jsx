import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import {
  Box,
  Button,
  Typography,
  Card,
  CardMedia,
  Stack,
  TextField,
  Alert,
  Snackbar,
} from '@mui/material';
import { PropTypes } from 'prop-types';
import { addElements } from '../../../app/slices/cartSlice';
import DatePicker from '../../Shared/DatePicker/DatePicker';
import styles from './DroneInfo.module.scss';

function DroneInfo({ data }) {
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [succes, setSucces] = useState(false);
  const [rentDates, setRentDates] = useState([]);
  const dispatch = useDispatch();

  const handleSend = () => {
    if (inputValue && rentDates.length > 0 && !rentDates.includes(null)) {
      const initialDate = moment(rentDates[0]);
      const finalDate = moment(rentDates[1]);
      const days = finalDate.diff(initialDate, 'days') + 1;

      const payload = {
        droneId: data._id,
        ref: data.model,
        image: data?.productImage.secure_url,
        quantity: parseInt(inputValue, 10),
        price: data.pricePerDay,
        subtotal: inputValue * data.pricePerDay * days,
        initialDate: initialDate.format('MM/DD/YYYY'),
        finalDate: finalDate.format('MM/DD/YYYY'),
        maxQuantity: data.quantity,
        days,
      };

      dispatch(addElements(payload));
      setSucces(true);
      setInputValue('');
    }
  };

  const handleChange = e => {
    const { value } = e.target;
    if (Number(value) <= 0) {
      setErrorMessage('cantidad debe ser mayor a 0');
    } else if (Number(value) > data.quantity) {
      setErrorMessage(
        `cantidad debe ser igual o menor al inventario disponible (${data.quantity})`,
      );
    } else {
      setErrorMessage(null);
    }
    setInputValue(value);
  };

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2}
      className={styles.droneInfo}
    >
      <Card raised className={styles.droneInfo__card}>
        <CardMedia
          component="img"
          image={data?.productImage.secure_url}
          alt={`Drone ${data.model}`}
        />
      </Card>
      <Stack spacing={2} className={styles.droneInfo__content}>
        <Box>
          <Typography variant="h2" component="h1">
            {data.model}
          </Typography>
          <Typography variant="h5" component="h2">
            {data.brand}
          </Typography>
        </Box>
        <Box>
          <Typography>
            <Box component="span" className={styles.droneInfo__textContainer}>
              Precio x día:
            </Box>
            <Box component="span">${data.pricePerDay}</Box>
          </Typography>
          <Typography>
            <Box component="span" className={styles.droneInfo__textContainer}>
              Disponibles:
            </Box>
            <Box component="span">{data.quantity}</Box>
          </Typography>
        </Box>
        <Stack spacing={1} className={styles.droneInfoBooking}>
          <Typography component="span" className={styles.droneInfoBooking__text}>
            Seleccione el rango de fechas y cantidad
          </Typography>
          <TextField
            error={errorMessage}
            helperText={errorMessage}
            id="quantity"
            label="Cantidad"
            variant="standard"
            value={inputValue}
            onChange={handleChange}
            className={styles.droneInfoBooking__quantity}
          />
          <DatePicker setDates={setRentDates} />
          {succes && (
            <Snackbar
              open={succes}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              autoHideDuration={1000}
              onClose={() => setSucces(false)}
            >
              <Alert severity="success">
                <strong>Producto agregado al carrito</strong>
              </Alert>
            </Snackbar>
          )}
          <Button color="primary" variant="contained" onClick={handleSend}>
            Agregar
          </Button>
        </Stack>
        <Typography>{data.description}</Typography>
      </Stack>
    </Stack>
  );
}

DroneInfo.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string,
    model: PropTypes.string,
    brand: PropTypes.string,
    description: PropTypes.string,
    productImage: PropTypes.shape({
      secure_url: PropTypes.string,
    }),
    quantity: PropTypes.number,
    pricePerDay: PropTypes.number,
    pricePerWeek: PropTypes.number,
    pricePerMonth: PropTypes.number,
    category_id: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
};

DroneInfo.defaultProps = {
  data: {
    reference: '',
    brand: '',
    quantity: 1,
    price: 1,
    description: '',
    image: '',
  },
};

export default DroneInfo;
