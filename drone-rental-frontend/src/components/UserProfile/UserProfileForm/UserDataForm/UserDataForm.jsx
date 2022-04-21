import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import 'yup-phone';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { updateUserInfo } from '../../../../app/slices/userSlice';
import { updateUserData } from '../../../../services/api/userAPI';

const validationSchemaUserData = yup.object({
  firstName: yup
    .string('Ingresa tu nombre')
    .required('Este campo es requerido')
    .max(50, 'El nombre debe tener una longitud máxima de 50 caracteres'),
  lastName: yup
    .string('Ingresa tu apellido')
    .required('Este campo es requerido')
    .max(50, 'El apellido debe tener una longitud máxima de 50 caracteres'),
  phone: yup
    .string('phone')
    .required('Por favor, ingrese su número de teléfono')
    .phone('IN', false, 'Ingresa un teléfono válido'),
  address: yup
    .string('Ingresa tu dirección')
    .min(8, 'Tu dirección debe tener al menos 8 caracteres')
    .max(50, 'Tu dirección debe tener máximo 50 caracteres')
    .required('Este campo es requerido'),
});

export default function UserDataForm({ userData }) {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      firstName: userData.firstName ? userData.firstName : '',
      lastName: userData.lastName ? userData.lastName : '',
      phone: userData.phone ? userData.phone : '',
      address: userData.address ? userData.address : '',
    },
    validationSchema: validationSchemaUserData,
    onSubmit: async values => {
      const { data } = await updateUserData(values, userData.token);
      const payload = {
        ...data,
      };
      dispatch(updateUserInfo(payload));
    },
  });
  const styles = {
    container: {
      padding: '1rem 2rem',
    },
    container_fields: {
      display: 'flex',
    },
  };
  return (
    <Box
      component="div"
      sx={{
        '& .MuiTextField-root': { margin: '8px 8px 8px 0', width: '50%' },
      }}
      noValidate
      autoComplete="off"
    >
      <div style={styles.container}>
        <Typography variant="h5">Datos Personales</Typography>
        <form onSubmit={formik.handleSubmit}>
          <div style={styles.container_fields}>
            <TextField
              id="firstName"
              name="firstName"
              label="Nombres"
              variant="outlined"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              id="lastName"
              name="lastName"
              label="Apellidos"
              variant="outlined"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </div>
          <div style={styles.container_fields}>
            <TextField
              id="phone"
              name="phone"
              label="Celular"
              variant="outlined"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
            <TextField
              id="address"
              name="address"
              label="Dirección"
              variant="outlined"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
          </div>
          <div style={styles.container_fields}>
            <Button variant="contained" type="submit">
              Guardar
            </Button>
          </div>
        </form>
      </div>
    </Box>
  );
}

UserDataForm.propTypes = {
  userData: PropTypes.shape({
    address: PropTypes.string,
    createdAt: PropTypes.string,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    password: PropTypes.string,
    phone: PropTypes.string,
    role: PropTypes.string,
    status: PropTypes.string,
    token: PropTypes.string,
    updatedAt: PropTypes.string,
    __v: PropTypes.number,
    _id: PropTypes.string,
  }),
};
UserDataForm.defaultProps = {
  userData: {},
};
