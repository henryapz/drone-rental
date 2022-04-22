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
  Badge,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../../app/slices/userSlice';
import DroneIcon from '../../../assets/images/drone-icon.png';
import styles from './Header.module.scss';
import CartDrawer from '../ShoppingCart/CartDrawer';

const navPages = [
  { name: 'Home', url: '/' },
  { name: 'Alquilar', url: '/drones' },
  { name: 'FAQs', url: '/faqs' },
];

function Header({ onMenuButtonClick }) {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openCart, setOpenCart] = useState(false);
  const user = useSelector(state => state.user);
  const handleOpenCart = () => setOpenCart(true);
  const handleCloseCart = () => setOpenCart(false);

  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const publicPages = [
    { name: 'Inicio de sesión', url: '/iniciar-sesion', onClick: handleCloseUserMenu },
    { name: 'Registro', url: '/registrar', onClick: handleCloseUserMenu },
  ];

  const privatePages = [
    { name: 'Perfil', url: '/profile', onClick: handleCloseUserMenu },
    {
      name: 'Cerrar Sesión',
      url: '/',
      onClick: () => {
        dispatch(logoutUser());
      },
    },
  ];
  const userPages = user.userData ? privatePages : publicPages;
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
              <Badge badgeContent={cart.products.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <CartDrawer open={openCart} handleClose={handleCloseCart} />

            <IconButton onClick={handleOpenUserMenu} color="inherit">
              {user.userData && (
                <Typography variant="subtitle2" className="user-email" component="div">
                  {user.userData.email}
                </Typography>
              )}
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
                  onClick={page.onClick}
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
