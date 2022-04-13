import React, { useState } from 'react';
import * as yup from 'yup';
import {
  TextField,
  Stack,
  Paper,
  Typography,
  FormControl,
  Select,
  OutlinedInput,
  MenuItem,
  InputLabel,
  InputAdornment,
  Button,
  FormHelperText,
} from '@mui/material';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';

const paymentMethods = [
  {
    id: 1,
    name: 'Efectivo',
  },
  {
    id: 2,
    name: 'Tarjeta (Epayco)',
  },
];

const validationSchema2 = yup.object({
  firstName: yup.string('firstName').required('Por favor, ingrese su nombre'),
  lastName: yup.string('lastName').required('Por favor, ingrese su apellido'),
  telephone: yup.string('telephone').required('Por favor, ingrese su número de teléfono'),
  address: yup.string('address').required('Por favor, ingrese su dirección de envío'),
  email: yup
    .string('email')
    .email('Ingresa un email válido')
    .required('Por favor, ingrese su correo electrónico'),
  cardNumber: yup.string('cardNumber').required('Esta no es un número de tarjeta válido'),
  cardName: yup
    .string('cardName')
    .required('Por favor, ingrese el nombre asociado a la tarjeta'),
  cardExpiringDate: yup
    .string('cardExpiringDate')
    .required('Por favor, ingrese la fecha de expiración'),
  cardCci: yup.string('cardCci').required('Por favor, ingrese el CCI'),
  document: yup
    .string('document')
    .required('Por favor, ingrese un documento de identidad'),
  cash: yup.string('cash').required('Por favor, ingrese el monto con el que pagará'),
});

function CheckoutForm() {
  const cart = useSelector(state => state.cart);
  const [paymentMethod, setPaymentMethod] = useState(1);

  const handlePaymentMethodChange = event => {
    setPaymentMethod(event.target.value);
  };

  const handleOnSubmit = (values) => {
    const payload = {
      order: {
        subTotal: 495,
        delivery: 5.5,
        total: 500,
        items: cart.products,
        paymentMethod: 'Tarjeta',
        cardInfo: {
          cardNumber: values.cardNumber,
          cardExpYear: values.cardExpYear,
          cardExpMonth: values.cardExpMonth,
          cardCvc: values.cardCvc,
        },
        paymentInfo: {
          docType: 'DNI',
          docNumber: values.document,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          city: values.city,
          address: values.address,
          phone: values.telephone,
          cellPhone: values.telephone,
          bill: '',
          description: 'Drone rental',
          value: '',
          tax: '',
          taxBase: '',
          currency: '',
          dues: '',
          ip: '',
        },
      },
    };
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      telephone: '',
      address: '',
      email: '',
      cardNumber: '',
      cardName: '',
      cardExpiringDate: '',
      cardCci: '',
      document: '',
      acceptedPrivacy: false,
      cash: 0,
    },
    validationSchema: validationSchema2,
    onSubmit: values => {
      handleOnSubmit(values);
    },
  });

  return (
    <Paper sx={{ flex: '1 1 0', padding: 3, textAlign: 'center' }} component="form">
      <Typography variant="h5" gutterBottom paddingBottom={2}>
        Información de Contacto
      </Typography>
      <Stack
        spacing={2}
        justifyContent="center"
        noValidate
        autoComplete="off"
        paddingBottom={2}
      >
        <Stack direction="row" display="flex" spacing={2}>
          <TextField
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
            sx={{ flex: 1 }}
            type="text"
            name="firstName"
            label="Nombre"
          />
          <TextField
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            sx={{ flex: 1 }}
            flex="1"
            type="text"
            name="lastName"
            label="Apellidos"
          />
        </Stack>
        <TextField
          value={formik.values.address}
          onChange={formik.handleChange}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
          type="text"
          name="address"
          width="100%"
          label="Direccion de envio"
        />
        <TextField
          value={formik.values.telephone}
          onChange={formik.handleChange}
          error={formik.touched.telephone && Boolean(formik.errors.telephone)}
          helperText={formik.touched.telephone && formik.errors.telephone}
          type="tel"
          name="telephone"
          label="Telefono"
        />

        <TextField
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          type="email"
          name="email"
          label="Email"
        />
        {/* <FormControlLabel
          control={<Checkbox checked={formValues.acceptedPrivacy} />}
          label="Políticas de privacidad"
          // className={styles.signForm__checkBtn}
        /> */}
      </Stack>
      <Typography variant="h5" gutterBottom paddingBottom={2}>
        Método de pago
      </Typography>
      <Stack
        spacing={2}
        justifyContent="center"
        noValidate
        autoComplete="off"
        paddingBottom={2}
      >
        <FormControl fullWidth>
          <InputLabel id="payment-method">Medio de pago</InputLabel>
          <Select
            labelId="payment-method"
            label="Medio de pago"
            onChange={handlePaymentMethodChange}
            value={paymentMethod}
          >
            {paymentMethods.map(method => (
              <MenuItem key={method.id} value={method.id}>
                {method.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {paymentMethod === 1 && (
          <FormControl fullWidth>
            <InputLabel
              error={formik.touched.cash && Boolean(formik.errors.cash)}
              htmlFor="outlined-adornment-amount"
            >
              Con cuánto pagará
            </InputLabel>
            <OutlinedInput
              value={formik.values.cash}
              onChange={formik.handleChange}
              error={formik.touched.cash && Boolean(formik.errors.cash)}
              name="cash"
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              label="Con cuánto pagará"
            />
            {formik.touched.cash && Boolean(formik.errors.cash) && (
              <FormHelperText error={formik.touched.cash && Boolean(formik.errors.cash)}>
                {formik.touched.cash && formik.errors.cash}
              </FormHelperText>
            )}
          </FormControl>
        )}
        {paymentMethod === 2 && (
          <Stack
            spacing={2}
            justifyContent="center"
            noValidate
            autoComplete="off"
            paddingBottom={2}
          >
            <TextField
              value={formik.values.cardNumber}
              onChange={formik.handleChange}
              error={formik.touched.cardNumber && Boolean(formik.errors.cardNumber)}
              helperText={formik.touched.cardNumber && formik.errors.cardNumber}
              type="text"
              name="cardNumber"
              label="Número de tarjeta"
            />
            <TextField
              value={formik.values.cardName}
              onChange={formik.handleChange}
              error={formik.touched.cardName && Boolean(formik.errors.cardName)}
              helperText={formik.touched.cardName && formik.errors.cardName}
              flex="1"
              type="text"
              name="cardName"
              label="Nombres y apellidos"
            />
            <Stack direction="row" display="flex" spacing={2}>
              <TextField
                value={formik.values.cardExpiringDate}
                onChange={formik.handleChange}
                error={
                  formik.touched.cardExpiringDate &&
                  Boolean(formik.errors.cardExpiringDate)
                }
                helperText={
                  formik.touched.cardExpiringDate && formik.errors.cardExpiringDate
                }
                sx={{ flex: 1 }}
                type="text"
                name="cardExpiringDate"
                label="Fecha de vencimiento"
              />
              <TextField
                value={formik.values.cardCci}
                onChange={formik.handleChange}
                error={formik.touched.cardCci && Boolean(formik.errors.cardCci)}
                helperText={formik.touched.cardCci && formik.errors.cardCci}
                sx={{ flex: 1 }}
                flex="1"
                type="text"
                name="cardCci"
                label="CCI"
              />
            </Stack>
            <TextField
              value={formik.values.document}
              onChange={formik.handleChange}
              error={formik.touched.document && Boolean(formik.errors.document)}
              helperText={formik.touched.document && formik.errors.document}
              flex="1"
              type="text"
              name="document"
              label="Documento"
            />
          </Stack>
        )}
      </Stack>
      <Button onClick={formik.handleSubmit} variant="contained">
        Alquilar
      </Button>
    </Paper>
  );
}

export default CheckoutForm;
