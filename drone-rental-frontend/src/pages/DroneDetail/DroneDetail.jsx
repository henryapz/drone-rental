import React from 'react';
import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Hero from '../../components/Shared/Hero/Hero';
import DroneInfo from '../../components/DroneDetail/DroneInfo/DroneInfo';
import Loader from '../../components/Shared/Loader/Loader';

function DroneDetail() {
  const drones = useSelector(state => state.drones);
  const { reference } = useParams();
  const droneData = drones.allDrones?.filter(drone => drone.model === reference)[0];
  const urls = [
    'https://www1.djicdn.com/dps/9b1b9b9cf00c94ff1ad673de052c669a.png',
    'https://dji-official-fe.djicdn.com/dps/50c6f0b5a78022bc1bac25bf24379b4d.jpg',
    'https://dji-official-fe.djicdn.com/dps/407048a6e395ef255e989db12fd872a1.jpg',
    'https://dji-official-fe.djicdn.com/dps/6611d2a9a27876250c022788cf1e1936.jpg',
    'https://dji-official-fe.djicdn.com/dps/1f5bd34994bc4f0f62da6143b2cb1df8.jpg',
    'https://dji-official-fe.djicdn.com/dps/74f7227d92d2afe9aa536a013452fb12.jpg',
    'https://dji-official-fe.djicdn.com/dps/757714446207d551e8cbe3ffd18e1c14.jpg',
    'https://dji-official-fe.djicdn.com/dps/1307827ee381a1211a93e8f988b5143b.jpg',
    'https://dji-official-fe.djicdn.com/dps/21f8464c304b94c4421280aaa39f726d.jpg',
    'https://dji-official-fe.djicdn.com/dps/edd37896183da3917fa90f6f49ac19a1.jpg',
    'https://www.parrot.com/assets/s3fs-public/styles/lglossless/public/2022-01/header_desktop.jpg',
  ];
  const randInt = Math.floor(Math.random() * urls.length);
  return (
    <>
      <Hero url={urls[randInt]} alt="Drone volando" />
      <Container>
        {!drones || !drones.status || drones.status === 'loading' ? (
          <Loader />
        ) : (
          <DroneInfo data={droneData} />
        )}
      </Container>
    </>
  );
}

export default DroneDetail;
