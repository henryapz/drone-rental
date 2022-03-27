import React from 'react';
import { PropTypes } from 'prop-types';
import { Typography, Container, Box } from '@mui/material';
import SignForm from '../../components/Shared/SignForm/SignForm';

function LoginPage({ admin }) {
  return (
    <Box sx={{ pt: '50px', pb: '50px' }}>
      <Container>
        <Typography gutterBottom variant="h3" component="div" textAlign="center">
          Inicio de sesión
        </Typography>
        <SignForm admin={admin} />
      </Container>
    </Box>
  );
}

export default LoginPage;

LoginPage.propTypes = {
  admin: PropTypes.bool,
};

LoginPage.defaultProps = {
  admin: false,
};
