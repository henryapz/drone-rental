import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { updatePassword } from '../../../../services/api/userAPI';

const validationSchemaPass = yup.object({
  oldPassword: yup
    .string('Ingresa tu contraseña actual')
    .required('Este campo es requerido')
    .min(6, 'La contraseña debe tener una longitud mínima de 6 caracteres')
    .max(32, 'La contraseña debe tener una longitud máxima de 6 caracteres'),
  newPassword: yup
    .string('Ingresa tu nueva contraseña')
    .required('Este campo es requerido')
    .min(6, 'La contraseña debe tener una longitud mínima de 6 caracteres')
    .max(32, 'El apellido debe tener una longitud máxima de 50 caracteres'),
});

export default function UserPassChangeForm({ userData }) {
  const formikPass = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
    },
    validationSchema: validationSchemaPass,
    onSubmit: async values => {
      await updatePassword(values, userData.token);
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
      <form onSubmit={formikPass.handleSubmit}>
        <div style={styles.container}>
          <Typography variant="h5">Cambiar Contraseña</Typography>
          <div style={styles.container_fields}>
            <TextField
              id="oldPassword"
              name="oldPassword"
              label="Contraseña Actual"
              variant="outlined"
              type="password"
              value={formikPass.values.oldPassword}
              onChange={formikPass.handleChange}
              error={
                formikPass.touched.oldPassword && Boolean(formikPass.errors.oldPassword)
              }
              helperText={formikPass.touched.oldPassword && formikPass.errors.oldPassword}
            />
            <TextField
              id="newPassword"
              name="newPassword"
              label="Nueva Contraseña"
              variant="outlined"
              type="password"
              value={formikPass.values.newPassword}
              onChange={formikPass.handleChange}
              error={
                formikPass.touched.newPassword && Boolean(formikPass.errors.newPassword)
              }
              helperText={formikPass.touched.newPassword && formikPass.errors.newPassword}
            />
          </div>
          <div style={styles.container_fields}>
            <Button variant="contained" type="submit">
              Guardar
            </Button>
          </div>
        </div>
      </form>
    </Box>
  );
}

UserPassChangeForm.propTypes = {
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
UserPassChangeForm.defaultProps = {
  userData: {},
};
