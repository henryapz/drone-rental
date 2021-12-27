import React from 'react';
import {
  Button,
  TextField,
  Stack,
  Container,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

function SignForm({ register }) {
  return (
    <Container>
      <Stack spacing={1} justifyContent="center" alignItems="center" margin="1rem">
        <Stack
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            // error
            // helperText="Incorrect entry."
            type="email"
            id="sign-form-email"
            label="Email"
            placeholder="email@someemail.com"
          />

          <TextField type="password" id="sign-form-passwd" label="Password" />
        </Stack>

        {register ? (
          <>
            <TextField
              type="password"
              id="sign-form-confirm-passwd"
              label="Confirm Password"
            />
            <FormControlLabel control={<Checkbox />} label="Políticas de privacidad" />
          </>
        ) : null}

        <Button variant="contained">Enviar </Button>
      </Stack>
    </Container>
  );
}

export default SignForm;
