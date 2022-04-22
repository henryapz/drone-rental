import React, { useState } from 'react';
import { Button, TextField, Stack, FormControlLabel, Checkbox, Box } from '@mui/material';
import { PropTypes } from 'prop-types';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../app/slices/userSlice';
import Login from '../../../assets/images/login.png';
import styles from './SignForm.module.scss';

const validationSchemaRegistration = yup.object({
  email: yup
    .string('Ingresa tu correo')
    .email('Ingresa un correo Válido')
    .required('El email es requerido'),
  password: yup
    .string('Ingresa tu contraseña')
    .min(5, 'La contraseña debe ser de al menos 5 carácteres')
    .required('La contraseña es requida'),
  confirmPassword: yup
    .string('Ingresa tu contraseña')
    .min(5, 'La contraseña debe ser de al menos 5 carácteres')
    .matches('password', 'La contraseña debe ser igual')
    .required('La contraseña es requida'),
});

const validationSchema = yup.object({
  email: yup
    .string('Ingresa tu correo')
    .email('Ingresa un correo Válido')
    .required('El email es requerido'),
  password: yup
    .string('Ingresa tu contraseña')
    .min(5, 'La contraseña debe ser de al menos 5 carácteres')
    .required('La contraseña es requida'),
});

function SignForm({ register, admin }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [msg, setMsg] = useState('');
  const validation = register ? validationSchemaRegistration : validationSchema;
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validation,
    onSubmit: async values => {
      // eslint-disable-next-line no-console
      if (register) {
        await axios
          .post('https://drone-rental-backend.herokuapp.com/api/users/createUser', values)
          .then(() => {
            navigate('/');
          })
          .catch(() => {
            setMsg('Error');
          });
      } else {
        await axios
          .post('https://drone-rental-backend.herokuapp.com/api/users/login', values)
          .then(resp => {
            navigate(admin ? '/admin/drones' : '/');
            const payload = {
              ...resp.data,
            };
            dispatch(loginUser(payload));
          })
          .catch(() => {
            setMsg('Credenciales invalidas');
          });
      }
    },
  });
  return (
    <Stack
      component="form"
      spacing={2}
      justifyContent="center"
      alignItems="center"
      margin="4rem auto"
      sx={{
        '& .MuiTextField-root': { width: '20rem' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={formik.handleSubmit}
    >
      <Box>
        <img src={Login} alt="login" className={styles.signform__image} />
      </Box>
      <TextField
        type="email"
        name="email"
        id="sign-form-email"
        label="Email"
        placeholder="email@someemail.com"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />

      <TextField
        id="password"
        name="password"
        label="Password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
      {register ? (
        <>
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)
            }
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Políticas de privacidad"
            className={styles.signForm__checkBtn}
          />
        </>
      ) : null}

      <Button className={styles.signForm__btn} variant="contained" type="submit">
        Enviar{' '}
      </Button>

      <span style={{ color: 'red' }} id="error-message">
        {msg}
      </span>
    </Stack>
  );
}

SignForm.propTypes = {
  register: PropTypes.bool,
  admin: PropTypes.bool,
};

SignForm.defaultProps = {
  register: false,
  admin: false,
};

export default SignForm;
