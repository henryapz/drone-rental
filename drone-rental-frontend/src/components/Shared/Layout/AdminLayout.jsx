import React from 'react';
import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import AdminSideBar from '../AdminSideBar/AdminSideBar';
import AdminHeader from '../AdminHeader/AdminHeader';

const drawerWidth = 240;

function AdminLayout() {
  const [openSideBar, setOpenSideBar] = React.useState(false);

  return (
    <Box display="flex">
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
