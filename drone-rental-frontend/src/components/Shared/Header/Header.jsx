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
import React, { useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import DroneIcon from '../../../assets/images/drone-icon.png';
import SideBar from '../SideBar/SideBar';
import styles from './Header.module.css';

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
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openSideBar, setOpenSideBar] = useState(false);

  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
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
                onClick={() => setOpenSideBar(true)}
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
                <Button component={Link} to={page.url} color="inherit" key={page.name}>
                  {page.name}
                </Button>
              ))}
            </Box>
            <Box className={styles.actions__container}>
              <IconButton color="inherit" aria-label="delete">
                <ShoppingCartIcon />
              </IconButton>
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
      <SideBar navPages={navPages} open={openSideBar} setOpen={setOpenSideBar} />
    </>
  );
}

export default Header;
