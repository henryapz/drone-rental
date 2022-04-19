import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar';
import LoginModal from '../LoginModal/LoginModal';

const navPages = [
  { name: 'Home', url: '/' },
  { name: 'Alquilar', url: '/drones' },
  { name: 'FAQs', url: '/faqs' },
];

function Layout() {
  const [openSideBar, setOpenSideBar] = useState(false);

  return (
    <Box>
      <LoginModal />
      <Header onMenuButtonClick={setOpenSideBar} />
      <SideBar navPages={navPages} open={openSideBar} setOpen={setOpenSideBar} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </Box>
  );
}

export default Layout;
