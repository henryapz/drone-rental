import { AppBar, CssBaseline, IconButton, Toolbar } from '@mui/material';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
// import PersonIcon from '@mui/icons-material/Person';
import PropTypes from 'prop-types';

function AdminHeader({ drawerWidth, onOpen }) {
  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={() => onOpen(true)}
            edge="start"
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          {/* <IconButton color="inherit">
            <PersonIcon />
          </IconButton> */}
        </Toolbar>
      </AppBar>
    </>
  );
}

AdminHeader.propTypes = {
  drawerWidth: PropTypes.number.isRequired,
  onOpen: PropTypes.func.isRequired,
};

export default AdminHeader;
