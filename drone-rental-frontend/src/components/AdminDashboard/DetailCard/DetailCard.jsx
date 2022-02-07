import React from 'react';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

function DetailCard({ children, name, value }) {
  const style = {
    container: {
      backgroundColor: '#F3F7FF',
      borderRadius: '10px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '10px 0',
      height: '100%',
    },
    container_icon: {
      backgroundColor: 'rgba(112, 153, 255, 0.3)',
      borderRadius: '13px',
      color: '#7099FF',
      padding: '8px',
    },
    container_title: {
      textAlign: 'center',
    },
  };
  return (
    <div style={style.container}>
      <div style={style.container_icon}>{children}</div>
      <Typography gutterBottom variant="h6" style={style.container_title}>
        {name}
      </Typography>
      <Typography gutterBottom variant="h3">
        {value}
      </Typography>
    </div>
  );
}

DetailCard.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  value: PropTypes.number,
};
DetailCard.defaultProps = {
  children: undefined,
  name: '',
  value: 0,
};

export default DetailCard;
