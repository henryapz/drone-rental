import { Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';

function UserProfileForm() {
  const styles = {
    container: {
      padding: '1rem 2rem',
    },
    container_fields: {
      display: 'flex',
    },
  };
  return (
    <>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { margin: '8px 8px 8px 0', width: '50%' },
        }}
        noValidate
        autoComplete="off"
      >
        <div style={styles.container}>
          <Typography variant="h5">Datos Personales</Typography>
          <div style={styles.container_fields}>
            <TextField label="Nombres" variant="outlined" />
            <TextField label="Apellidos" variant="outlined" />
          </div>
          <div style={styles.container_fields}>
            <TextField label="Celular" variant="outlined" />
            <TextField label="Dirección" variant="outlined" />
          </div>
          <div style={styles.container_fields}>
            <Button variant="contained">Guardar</Button>
          </div>
        </div>
      </Box>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { margin: '8px 8px 8px 0', width: '50%' },
        }}
        noValidate
        autoComplete="off"
      >
        <div style={styles.container}>
          <Typography variant="h5">Cambiar Contraseña</Typography>
          <div style={styles.container_fields}>
            <TextField label="Contraseña Actual" variant="outlined" type="password" />
            <TextField label="Nueva Contraseña" variant="outlined" type="password" />
          </div>
          <div style={styles.container_fields}>
            <Button variant="contained">Guardar</Button>
          </div>
        </div>
      </Box>
    </>
  );
}

export default UserProfileForm;
