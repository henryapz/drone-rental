import React from 'react';
import { Box, Typography, Card, CardMedia, Stack, TextField } from '@mui/material';
import { PropTypes } from 'prop-types';
import DatePicker from '../../Shared/DatePicker/DatePicker';
import styles from './DroneInfo.module.scss';

function DroneInfo({ data }) {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2}
      className={styles.droneInfo}
    >
      <Card className={styles.droneInfo__card}>
        <CardMedia
          component="img"
          // height="100"
          // height="200"
          image={data.image}
          alt={`Drone ${data.reference}`}
        />
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
            id="quantity"
            label="Cantidad"
            variant="standard"
            className={styles.droneInfoBooking__quantity}
          />
          <DatePicker />
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
