import React from 'react';
import {
  Button,
  TextField,
  Stack,
  Container,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { PropTypes } from 'prop-types';

function SignForm({ register }) {
  return (
    <Container>
      <Stack
        component="form"
        spacing={1}
        justifyContent="center"
        alignItems="center"
        margin="5rem auto"
        sx={{
          '& .MuiTextField-root': { width: '20rem' },
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

SignForm.propTypes = {
  register: PropTypes.bool,
};

SignForm.defaultProps = {
  register: false,
};

export default SignForm;
