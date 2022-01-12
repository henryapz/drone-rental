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
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, NavLink } from 'react-router-dom';
import DroneIcon from '../../../assets/images/drone-icon.png';
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import styles from './Header.module.scss';

const navPages = [
  { name: 'Home', url: '/' },
  { name: 'Alquilar', url: '/drones' },
  { name: 'FAQs', url: '/faqs' },
];

const userPages = [
  { name: 'Inicio de sesión', url: '/iniciar-sesion' },
  { name: 'Registro', url: '/registrar' },
];

function Header({ onMenuButtonClick }) {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openCart, setOpenCart] = useState(false);
  const handleOpenCart = () => setOpenCart(true);
  const handleCloseCart = () => setOpenCart(false);

  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          <Box className={styles.logo__container}>
            <IconButton
              size="large"
              color="inherit"
              sx={{
                display: { md: 'none' },
              }}
              onClick={() => onMenuButtonClick(true)}
            >
              <MenuIcon />
            </IconButton>
            <Avatar alt="Logo" src={DroneIcon} variant="square" />
            <Typography variant="h6" component="div">
              D-rental
            </Typography>
          </Box>
          <Box
            className={styles.links__container}
            sx={{
              display: { xs: 'none', md: 'flex' },
            }}
          >
            {navPages.map(page => (
              <NavLink
                to={page.url}
                key={page.name}
                className={({ isActive }) =>
                  isActive ? styles.navlink__active : styles.navlink__link
                }
              >
                <Button color="inherit">{page.name}</Button>
              </NavLink>
            ))}
          </Box>
          <Box className={styles.actions__container}>
            <IconButton onClick={handleOpenCart} color="inherit" aria-label="delete">
              <ShoppingCartIcon />
            </IconButton>
            <ShoppingCart open={openCart} handleClose={handleCloseCart} />

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
                  {page.name}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

Header.propTypes = {
  onMenuButtonClick: PropTypes.func.isRequired,
};

export default Header;
