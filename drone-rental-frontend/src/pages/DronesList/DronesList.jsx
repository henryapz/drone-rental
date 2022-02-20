import React from 'react';
import { Typography, Container, Box } from '@mui/material';
import DroneCard from '../../components/DronesList/DroneCard/DroneCard';
import drones from '../../services/mock/drones';

function DronesList() {
  return (
    <Box sx={{ pt: '50px', pb: '50px' }}>
      <Container maxWidth="xl">
        <Typography gutterBottom variant="h3" component="div" textAlign="center">
          Drones
        </Typography>
        <DroneCard dronesList={drones} />
      </Container>
    </Box>
  );
}

export default DronesList;
