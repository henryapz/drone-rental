import React from 'react';
import { Button, TextField, Stack, FormControlLabel, Checkbox, Box } from '@mui/material';
import { PropTypes } from 'prop-types';
import Login from '../../../assets/images/login.png';
import styles from './SignForm.module.scss';

function SignForm({ register }) {
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
      <Box>
        <img src={Login} alt="login" className={styles.signform__image} />
      </Box>
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
          <FormControlLabel
            control={<Checkbox />}
            label="Políticas de privacidad"
            className={styles.signForm__checkBtn}
          />
        </>
      ) : null}

      <Button className={styles.signForm__btn} variant="contained">
        Enviar{' '}
      </Button>
    </Stack>
  );
}

SignForm.propTypes = {
  register: PropTypes.bool,
};

SignForm.defaultProps = {
  register: false,
};

export default SignForm;
