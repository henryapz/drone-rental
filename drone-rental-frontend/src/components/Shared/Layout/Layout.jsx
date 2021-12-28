import React from 'react';
import { Box, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Footer from '../Footer/Footer';

function Layout({ children }) {
  const theme = useTheme();
  return (
    <Box sx={{ fontFamily: theme.typography.main }}>
      <header>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/signin">Signin</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/droneslist">lista drones</Link>
          </li>
        </ul>
      </header>
      <main>{children}</main>
      <Footer />
    </Box>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};

Layout.defaultProps = {
  children: <div />,
};

export default Layout;
