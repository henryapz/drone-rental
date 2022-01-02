import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
} from '@mui/material';
import React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import DroneIcon from '../../../assets/images/drone-icon.png';

const navPages = [
  { name: 'Home', url: '/' },
  { name: 'Alquilar', url: '/droneslist' },
  { name: 'FAQs', url: '/' },
];

const userPages = [
  { name: 'Inicio de sesión', url: '/signin' },
  { name: 'Registro', url: '/login' },
];

function Header() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar alt="Logo" src={DroneIcon} variant="square" />
          <Typography variant="h6" component="div" flexGrow={1}>
            D-rental
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {navPages.map(page => (
              <Button component={Link} to={page.url} color="inherit" key={page.name}>
                {page.name}
              </Button>
            ))}
          </Box>
          <IconButton color="inherit" aria-label="delete">
            <ShoppingCartIcon />
          </IconButton>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} color="inherit">
              <PersonIcon />
            </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {userPages.map(page => (
                <MenuItem
                  component={Link}
                  to={page.url}
                  key={page.name}
                  onClick={handleCloseUserMenu}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
