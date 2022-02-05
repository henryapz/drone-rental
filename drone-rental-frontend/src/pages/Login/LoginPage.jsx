import React from 'react';
import { Typography, Container, Box } from '@mui/material';
import SignForm from '../../components/Shared/SignForm/SignForm';

function LoginPage() {
  return (
    <Box sx={{ pt: '50px', pb: '50px' }}>
      <Container>
        <Typography gutterBottom variant="h3" component="div" textAlign="center">
          Inicio de sesión
        </Typography>
        <SignForm />
      </Container>
    </Box>
  );
}

export default LoginPage;
