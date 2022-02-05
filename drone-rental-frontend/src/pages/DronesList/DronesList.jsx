import React from 'react';
import { Typography, Container, Box } from '@mui/material';
import DroneCard from '../../components/DronesList/DroneCard/DroneCard';

function DronesList() {
  return (
    <Box sx={{ pt: '50px', pb: '50px' }}>
      <Container maxWidth="xl">
        <Typography gutterBottom variant="h3" component="div" textAlign="center">
          Drones
        </Typography>
        <DroneCard />
      </Container>
    </Box>
  );
}

export default DronesList;
