import React from 'react';
import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import Hero from '../../components/Shared/Hero/Hero';
import DroneInfo from '../../components/DroneDetail/DroneInfo/DroneInfo';
import dronesData from '../../services/mock/drones';

function DroneDetail() {
  const { reference } = useParams();
  const droneData = dronesData.filter(drone => drone.reference === reference)[0];
  return (
    <>
      <Hero
        url="https://www1.djicdn.com/dps/9b1b9b9cf00c94ff1ad673de052c669a.png"
        alt="Drone volando"
      />
      <Container>
        <DroneInfo data={droneData} />
      </Container>
    </>
  );
}

export default DroneDetail;
