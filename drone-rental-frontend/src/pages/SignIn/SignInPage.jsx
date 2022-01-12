import React from 'react';
import { Typography, Container, Box } from '@mui/material';
import SignForm from '../../components/Shared/SignForm/SignForm';

function SignInPage() {
  return (
    <Box sx={{ pt: '50px', pb: '50px' }}>
      <Container>
        <Typography gutterBottom variant="h3" component="div" textAlign="center">
          Registro
        </Typography>
        <SignForm register />
      </Container>
    </Box>
  );
}

export default SignInPage;
