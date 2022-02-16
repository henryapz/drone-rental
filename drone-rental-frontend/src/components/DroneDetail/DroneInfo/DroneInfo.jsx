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
} from '@mui/material';
import { PropTypes } from 'prop-types';
import DatePicker from '../../Shared/DatePicker/DatePicker';
import styles from './DroneInfo.module.scss';
import { addElements, updateTotal } from '../../../app/slices/cartSlice';

function DroneInfo({ data }) {
  const [inputValue, setInputValue] = useState('');
  const [inputHasError, setInputHasError] = useState(false);
  const [rentDates, setRentDates] = useState([]);
  const dispatch = useDispatch();

  const handleSend = () => {
    const initialDate = moment(rentDates[0]);
    const finalDate = moment(rentDates[1]);
    const days = finalDate.diff(initialDate, 'days');

    const payload = {
      ref: data.reference,
      quantity: inputValue,
      price: data.price,
      subtotal: inputValue * data.price * days,
      initialDate: initialDate.format('DD/MM/YYYY'),
      finalDate: finalDate.format('DD/MM/YYYY'),
      days,
    };
    dispatch(addElements(payload));
    dispatch(updateTotal(inputValue * data.price * days));
    setInputValue('');
  };

  const handleChange = e => {
    const { value } = e.target;
    if (Number(value) <= 0) {
      setInputHasError(true);
    } else {
      setInputHasError(false);
    }
    setInputValue(value);
  };
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2}
      className={styles.droneInfo}
    >
      <Card className={styles.droneInfo__card}>
        <CardMedia component="img" image={data.image} alt={`Drone ${data.reference}`} />
      </Card>
      <Stack spacing={2} className={styles.droneInfo__content}>
        <Box>
          <Typography variant="h2" component="h1">
            {data.reference}
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
            <Box component="span">${data.price}</Box>
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
            error={inputHasError}
            helperText={inputHasError ? 'cantidad debe ser mayor a 0' : null}
            id="quantity"
            label="Cantidad"
            variant="standard"
            value={inputValue}
            onChange={handleChange}
            className={styles.droneInfoBooking__quantity}
          />
          <DatePicker setDates={setRentDates} />
          <Button color="primary" variant="contained" onClick={handleSend}>
            Enviar
          </Button>
        </Stack>
        <Typography>{data.description}</Typography>
      </Stack>
    </Stack>
  );
}

DroneInfo.propTypes = {
  data: PropTypes.shape({
    reference: PropTypes.string,
    brand: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.number,
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
