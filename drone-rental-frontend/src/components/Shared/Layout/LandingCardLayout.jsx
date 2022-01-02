import React from 'react';
import { Box, Container } from '@mui/material';
import PropTypes from 'prop-types';

function LandingCardLayout({ children, backgroundColor, title }) {
  return (
    <Box sx={{ pt: '50px', pb: '50px', backgroundColor }}>
      <Container>
        <Box
          sx={{
            textAlign: 'center',
            color: 'primary.dark',
            typography: 'h4',
            fontWeight: 'bold',
            mb: 3,
          }}
        >
          {title}
        </Box>
        {children}
      </Container>
    </Box>
  );
}

LandingCardLayout.propTypes = {
  children: PropTypes.node,
  backgroundColor: PropTypes.string,
  title: PropTypes.string,
};

LandingCardLayout.defaultProps = {
  children: <div />,
  backgroundColor: 'secondary.light',
  title: 'Default',
};

export default LandingCardLayout;
