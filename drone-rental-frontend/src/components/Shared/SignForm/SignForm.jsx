import React from 'react';
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

const validationSchema = yup.object({
  email: yup
    .string('Ingresa tu correo')
    .email('Ingresa un correo Válido')
    .required('El email es requerido'),
  password: yup
    .string('Ingresa tu contraseña')
    .min(7, 'La contraseña debe ser de al menos 8 carácteres')
    .required('La contraseña es requida'),
});

function SignForm({ register, admin }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async values => {
      // eslint-disable-next-line no-console
      await axios.post('http://localhost:8080/api/users/login', values).then(resp => {
        navigate(admin ? '/admin/dashboard' : '/');
        const payload = {
          ...resp.data,
        };
        dispatch(loginUser(payload));
      });
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
            type="password"
            id="sign-form-confirm-passwd"
            label="Confirm Password"
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
