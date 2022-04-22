import React from 'react';
import * as yup from 'yup';
import 'yup-phone';
import {
  TextField,
  Stack,
  Paper,
  Typography,
  Button,
  CardMedia,
  Box,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  FormControl,
} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import { cartTotalSelector } from '../../app/selectors/cartSelector';
import CreditCards from '../../assets/images/credit-cards.png';
import { createOrder, resetOrder } from '../../app/slices/orderSlice';
import CheckoutModal from './CheckoutModal';
import { resetCart } from '../../app/slices/cartSlice';

const validationSchema = yup.object({
  firstName: yup.string('firstName').required('Por favor, ingrese su nombre'),
  lastName: yup.string('lastName').required('Por favor, ingrese su apellido'),
  telephone: yup
    .string('telephone')
    .required('Por favor, ingrese su número de teléfono')
    .phone('IN', false, 'Ingresa un teléfono válido'),
  address: yup.string('address').required('Por favor, ingrese su dirección de envío'),
  email: yup
    .string('email')
    .email('Ingresa un email válido')
    .required('Por favor, ingrese su email'),
  cardNumber: yup
    .string('cardNumber')
    .required('Por favor, ingrese su número de tarjeta')
    .test('test-card', 'El número de tarjeta es inválido', value => {
      const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
      const mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
      const amexpRegEx = /^(?:3[47][0-9]{13})$/;
      return (
        visaRegEx.test(value) || mastercardRegEx.test(value) || amexpRegEx.test(value)
      );
    }),
  cardName: yup
    .string('cardName')
    .required('Por favor, ingrese el nombre asociado a la tarjeta'),
  cardExpiringDate: yup
    .string('cardExpiringDate')
    .required('Por favor, ingrese la fecha de expiración')
    .nullable(),
  cardCci: yup
    .string('cardCci')
    .required('Por favor, ingrese el CCI')
    .matches(/^[0-9]+$/, 'Solo se admiten dígitos')
    .min(3, 'Deben ser 3 dígitos')
    .max(3, 'Deben ser 3 dígitos'),
  document: yup
    .string('document')
    .required('Por favor, ingrese un documento de identidad')
    .matches(/^[0-9]+$/, 'Solo se admiten dígitos')
    .min(8, 'Deben ser mínimo 7 dígitos (Perú)')
    .max(10, 'Deben ser máximo 10 dígitos (Colombia)'),
  acceptedPrivacy: yup
    .bool()
    .oneOf([true], 'Por favor, aceptar los términos y condiciones'),
});

function CheckoutForm() {
  const [open, setOpen] = React.useState(false);
  const cart = useSelector(state => state.cart);
  const total = useSelector(cartTotalSelector);
  const user = useSelector(state => state.user.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnSubmit = values => {
    const payload = {
      order: {
        subTotal: total,
        tax: (0.18 * total).toFixed(2),
        delivery: 5.5,
        total: (total + 5.5).toFixed(2),
        items: cart.products.map(item => ({
          amount: item.price,
          quantity: item.quantity,
          startDate: item.initialDate,
          endDate: item.finalDate,
          droneId: item.droneId,
        })),
      },
      has_card: false,
      card: {
        cardNumber: values.cardNumber,
        cardExpYear: values.cardExpiringDate.getFullYear().toString(),
        cardExpMonth: (values.cardExpiringDate.getMonth() + 1).toString(),
        cardCvc: values.cardCci,
      },
      payment: {
        docType: values.document.length === 8 ? 'DNI' : 'C.C.',
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
        value: total,
        tax: (0.18 * total).toFixed(2),
        taxBase: (total - 0.18 * total).toFixed(2),
        currency: 'USD',
        dues: '12',
        ip: '',
      },
    };
    setOpen(true);
    dispatch(createOrder({ body: payload, token: user.token }));
  };

  const handleRedirect = isSuccess => {
    dispatch(resetOrder());
    if (isSuccess) {
      dispatch(resetCart());
    }
    setOpen(false);
    navigate('/profile');
  };

  const formik = useFormik({
    initialValues: {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      telephone: user.phone || '',
      address: user.address || '',
      email: user.email || '',
      cardNumber: '',
      cardName: '',
      cardExpiringDate: '',
      cardCci: '',
      document: '',
      acceptedPrivacy: false,
    },
    validationSchema,
    onSubmit: values => {
      handleOnSubmit(values);
    },
  });

  return (
    <Paper sx={{ flex: '1 1 0', padding: 3, textAlign: 'center' }} component="form">
      <CheckoutModal
        open={open}
        setOpen={() => setOpen(false)}
        handleRedirect={handleRedirect}
      />
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
        <FormControl
          error={formik.touched.acceptedPrivacy && Boolean(formik.errors.acceptedPrivacy)}
        >
          <FormControlLabel
            control={<Checkbox checked={formik.values.acceptedPrivacy} />}
            onChange={formik.handleChange}
            label="Políticas de privacidad"
            name="acceptedPrivacy"
          />
        </FormControl>
        {formik.touched.acceptedPrivacy && formik.errors.acceptedPrivacy && (
          <FormHelperText error>{formik.errors.acceptedPrivacy}</FormHelperText>
        )}
      </Stack>
      <Box display="flex" paddingY={2} justifyContent="center">
        <Typography
          variant="h5"
          gutterBottom
          paddingBottom={2}
          margin={0}
          paddingY={0}
          paddingRight={3}
        >
          Método de pago
        </Typography>
        <CardMedia
          component="img"
          sx={{ width: '20%', objectFit: 'contain', paddingRight: 2 }}
          image={CreditCards}
          alt="Item"
        />
      </Box>
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
          sx={{ flex: 3 }}
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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              inputFormat="MM/yy"
              views={['year', 'month']}
              label="Fecha de vencimiento"
              minDate={new Date('2022-03')}
              maxDate={new Date('2030-12')}
              value={formik.values.cardExpiringDate}
              onChange={value => {
                formik.setFieldValue('cardExpiringDate', value);
              }}
              inputProps={{
                readOnly: true,
              }}
              renderInput={params => (
                <TextField
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...params}
                  error={
                    formik.touched.cardExpiringDate &&
                    Boolean(formik.errors.cardExpiringDate)
                  }
                  helperText={
                    formik.touched.cardExpiringDate && formik.errors.cardExpiringDate
                  }
                />
              )}
            />
          </LocalizationProvider>
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
      <Button onClick={formik.handleSubmit} variant="contained">
        Alquilar
      </Button>
    </Paper>
  );
}

export default CheckoutForm;
