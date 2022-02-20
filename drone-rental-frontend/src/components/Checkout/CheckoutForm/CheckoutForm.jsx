import React from 'react';
import { TextField, Stack, FormControlLabel, Checkbox } from '@mui/material';

function CheckoutForm() {
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
    >
      <TextField type="text" id="name" label="Nombre" placeholder="Jane" />
      <TextField type="text" id="lastName" label="Apellidos" placeholder="Doe" />
      <TextField
        type="text"
        id="address"
        label="Direccion de envio"
        placeholder="calle 14 #30"
      />
      <TextField type="tel" id="phone" label="Telefono" placeholder="xxx-xxxxx" />

      <TextField
        // error
        // helperText="Incorrect entry."
        type="email"
        id="sign-form-email"
        label="Email"
        placeholder="email@someemail.com"
      />
      <FormControlLabel
        control={<Checkbox />}
        label="Políticas de privacidad"
        // className={styles.signForm__checkBtn}
      />
    </Stack>
  );
}

export default CheckoutForm;
