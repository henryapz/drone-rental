import React from 'react';
import PeopleIcon from '@mui/icons-material/People';
import { Typography } from '@mui/material';

function DetailCard() {
  const style = {
    container: {
      backgroundColor: '#F3F7FF',
      borderRadius: '10px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '10px 0',
    },
    container_icon: {
      backgroundColor: 'rgba(112, 153, 255, 0.3)',
      borderRadius: '13px',
      color: '#7099FF',
      padding: '8px',
    },
  };
  return (
    <div style={style.container}>
      <div style={style.container_icon}>
        <PeopleIcon />
      </div>
      <Typography gutterBottom variant="h5">
        Ingreso Total
      </Typography>
      <Typography gutterBottom variant="h3">
        148
      </Typography>
    </div>
  );
}

export default DetailCard;
