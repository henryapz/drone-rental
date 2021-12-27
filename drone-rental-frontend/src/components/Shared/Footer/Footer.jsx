import React from 'react';
import { Button, Box, TextField, Stack, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function Footer() {
  const theme = useTheme();
  return (
    <footer>
      <Stack spacing={5} direction="row" bgcolor={theme.pallete.darkBg}>
        <Container>
          <Stack spacing={1} justifyContent="center" alignItems="center" margin="1rem">
            <p>Soporte</p>
            <a href="/">Cobertura</a>
            <a href="/">Ordenes</a>
            <a href="/">Pago</a>
            <a href="/">FAQ`s</a>
          </Stack>
        </Container>
        <Container>
          <Stack spacing={1} justifyContent="center" alignItems="center" margin="1rem">
            <Box
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
                id="footer-email"
                label="Email"
                placeholder="email@someemail.com"
              />
            </Box>
            <Button variant="contained">Enviar </Button>
          </Stack>
        </Container>
      </Stack>
    </footer>
  );
}

export default Footer;
