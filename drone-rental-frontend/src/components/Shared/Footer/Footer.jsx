import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Button,
  Box,
  TextField,
  Stack,
  Container,
  Divider,
  Link,
  IconButton,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

function Footer() {
  return (
    <Box sx={{ pt: '50px', pb: '50px', backgroundColor: 'primary.light' }}>
      <Container>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          divider={<Divider orientation="vertical" flexItem />}
          justifyContent="center"
        >
          <Link
            textAlign="center"
            variant="body1"
            underline="none"
            component={RouterLink}
            to="/"
          >
            Cobertura
          </Link>
          <Link
            textAlign="center"
            variant="body1"
            underline="none"
            component={RouterLink}
            to="/"
          >
            Órdenes
          </Link>
          <Link
            textAlign="center"
            variant="body1"
            underline="none"
            component={RouterLink}
            to="/pago"
          >
            Pago
          </Link>
          <Link
            textAlign="center"
            variant="body1"
            underline="none"
            component={RouterLink}
            to="/faqs"
          >
            FAQs
          </Link>
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
          margin="2rem"
        >
          <Box component="form" noValidate autoComplete="off">
            <TextField
              type="email"
              id="footer-email"
              label="Email"
              placeholder="email@someemail.com"
            />
          </Box>
          <Button color="secondary" variant="contained">
            Enviar{' '}
          </Button>
        </Stack>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={3}
          justifyContent="center"
        >
          <IconButton color="primary" aria-label="upload picture" component="span">
            <FacebookIcon />
          </IconButton>
          <IconButton color="primary" aria-label="upload picture" component="span">
            <InstagramIcon />
          </IconButton>
          <IconButton color="primary" aria-label="upload picture" component="span">
            <TwitterIcon />
          </IconButton>
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;
