import React from 'react';
import { Card, CardMedia } from '@mui/material';
import { PropTypes } from 'prop-types';

function Hero({ url, alt }) {
  return (
    <Card sx={{ maxWidth: '1800px', margin: '0.2rem auto' }}>
      <CardMedia component="img" width="100%" height="500" image={url} alt={alt} />
    </Card>
  );
}

Hero.propTypes = {
  url: PropTypes.string,
  alt: PropTypes.string,
};

Hero.defaultProps = {
  url: '',
  alt: '',
};
export default Hero;
