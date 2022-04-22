import React from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { PropTypes } from 'prop-types';
import { Container, Box, Typography, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import DroneCard from '../../DronesList/DroneCard';
import Hero from '../../Shared/Hero/Hero';
import Loader from '../../Shared/Loader/Loader';

function CategoryInfo({ data }) {
  const drones = useSelector(state => state.drones);
  const categoryDrones = drones.allDrones.filter(
    drone => drone.category_id.name === data.name.toLowerCase(),
  );

  if (!drones.data) {
    return <Loader />;
  }

  return (
    <Container>
      <Typography variant="h2" component="h1" textAlign="center" margin="2rem auto">
        {data?.name.toUpperCase()}
      </Typography>
      <Hero url={data?.image_id.secure_url} alt={`imagen de dron ${data?.name}`} />
      <Box margin="1rem auto">
        <Typography variant="subtitle1" component="p">
          {data?.abstract}
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h5" component="h2" margin="2rem auto">
          Drones relacionados
        </Typography>
        <Grid container spacing={2} justifyContent="space-evenly" alignItems="stretch">
          {categoryDrones.map(drone => (
            <DroneCard key={nanoid()} drone={drone} />
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

CategoryInfo.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    animationUrl: PropTypes.string,
    image_id: PropTypes.shape({
      secure_url: PropTypes.string,
    }),
    abstract: PropTypes.string,
  }),
};

CategoryInfo.defaultProps = {
  data: {
    name: '',
    url: '',
    hero_url: '',
    abstract: '',
  },
};
export default CategoryInfo;
