import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

function Layout() {
  return (
    <Box>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </Box>
  );
}

export default Layout;
