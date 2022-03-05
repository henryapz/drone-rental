import React from 'react';
import { PropTypes } from 'prop-types';
import { Container, Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import DroneCard from '../../DronesList/DroneCard';
import Hero from '../../Shared/Hero/Hero';

function CategoryInfo({ data }) {
  const drones = useSelector(state => state.drones);
  const categoryDrones = drones.data.filter(
    drone => drone.category_id.name === data.name.toLowerCase(),
  );

  return (
    <Container>
      <Typography variant="h2" component="h1" textAlign="center" margin="2rem auto">
        {data?.name}
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
        <DroneCard dronesList={categoryDrones} />
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
