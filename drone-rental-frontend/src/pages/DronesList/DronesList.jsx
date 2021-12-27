import React from 'react';
import { Typography, Container } from '@mui/material';
import DroneCard from '../../components/DroneDetail/DroneCard/DroneCard';

function DronesList() {
  return (
    <Container maxWidth="xl">
      <Typography
        gutterBottom
        variant="h2"
        component="div"
        sx={{ width: '100%', margin: 0, textAlign: 'center' }}
      >
        Drones
      </Typography>
      <DroneCard />
    </Container>
  );
}

export default DronesList;
