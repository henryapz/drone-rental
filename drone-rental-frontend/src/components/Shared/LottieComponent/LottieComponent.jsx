import React from 'react';
import Lottie from 'react-lottie-player';
import PropTypes from 'prop-types';

function LottieComponent({ url }) {
  return <Lottie path={url} play style={{ alignSelf: 'center' }} />;
}

LottieComponent.propTypes = {
  url: PropTypes.string,
};

LottieComponent.defaultProps = {
  url: '',
};

export default LottieComponent;
