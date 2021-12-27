import React from 'react';
import { Box, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';

function Layout({ children }) {
  const theme = useTheme();
  return (
    <Box sx={{ fontFamily: theme.typography.main }}>
      <header>
        <Link to="/">Home</Link>
        <Link to="/signin">Sign In</Link>
      </header>
      <main>{children}</main>
      <Footer />
    </Box>
  );
}

export default Layout;
