import React from 'react';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InfoIcon from '@mui/icons-material/Info';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

function TotalProfit({ profit }) {
  const styles = {
    container: {
      backgroundColor: '#1C2B51',
      padding: '15px',
      maxWidth: '800px',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      color: 'white',
      width: '100%',
    },
    container_image: {
      backgroundColor: '#26355B',
      borderRadius: '10px',
      width: 'fit-content',
      padding: '8px',
      height: 'fit-content',
      color: '#C2D3FF',
    },
    container_text: {
      padding: '0 10px',
    },
    container_info: {
      color: '#C2D3FF',
      fontSize: '32px',
      cursor: 'pointer',
    },
  };
  return (
    <div style={styles.container}>
      <div style={styles.container_image}>
        <AttachMoneyIcon />
      </div>
      <div style={styles.container_text}>
        <Typography gutterBottom variant="h5">
          Ingreso Total
        </Typography>
        <Typography gutterBottom variant="h4">
          ${profit}
        </Typography>
      </div>
      <InfoIcon style={styles.container_info} />
    </div>
  );
}

TotalProfit.propTypes = {
  profit: PropTypes.number,
};
TotalProfit.defaultProps = {
  profit: 0,
};

export default TotalProfit;
