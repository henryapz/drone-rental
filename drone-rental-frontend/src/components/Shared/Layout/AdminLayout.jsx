import React from 'react';
import { Box, Toolbar } from '@mui/material';
import { PropTypes } from 'prop-types';
import { Outlet } from 'react-router-dom';
import AdminSideBar from '../AdminSideBar/AdminSideBar';
import AdminHeader from '../AdminHeader/AdminHeader';
import LoginPage from '../../../pages/Login/LoginPage';
import LoginModal from '../LoginModal/LoginModal';

const drawerWidth = 240;

function AdminLayout({ isAllowed }) {
  const [openSideBar, setOpenSideBar] = React.useState(false);

  if (!isAllowed) {
    return <LoginPage admin />;
  }

  return (
    <Box display="flex">
      <LoginModal />
      <AdminHeader drawerWidth={drawerWidth} onOpen={setOpenSideBar} />
      <AdminSideBar open={openSideBar} onClose={setOpenSideBar} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: '100%' }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default AdminLayout;

AdminLayout.propTypes = {
  isAllowed: PropTypes.bool,
};

AdminLayout.defaultProps = {
  isAllowed: false,
};
