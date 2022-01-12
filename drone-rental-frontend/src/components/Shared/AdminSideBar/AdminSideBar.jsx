import { Box, Drawer } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import AdminSideBarList from '../AdminSideBarList/AdminSideBarList';

const drawerWidth = 240;
const navPages = [
  { name: 'Dashboard', url: '/admin/dashboard' },
  { name: 'Drones', url: '/admin/drones' },
  { name: 'Pedidos', url: '/admin/orders' },
];

function AdminSideBar({ open, onClose }) {
  const handleClose = () => {
    onClose(false);
  };
  return (
    <Box sx={{ width: { sm: drawerWidth } }}>
      <Drawer
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          width: drawerWidth,
        }}
        variant="permanent"
        open
      >
        <AdminSideBarList navPages={navPages} onItemClick={handleClose} />
      </Drawer>
      <Drawer anchor="left" open={open} onClose={handleClose}>
        <Box width={drawerWidth} role="presentation">
          <AdminSideBarList navPages={navPages} onItemClick={handleClose} />
        </Box>
      </Drawer>
    </Box>
  );
}

AdminSideBar.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AdminSideBar;
