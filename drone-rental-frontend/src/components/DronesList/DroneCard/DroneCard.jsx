import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  Grid,
} from '@mui/material';

function DroneCard({ dronesList }) {
  const navigate = useNavigate();
  const currentUrl = useLocation();

  function handleClick(reference) {
    if (currentUrl.pathname === '/drones') {
      navigate(`./${reference}`);
    } else {
      navigate(`../drones/${reference}`, { options: { replace: true } });
    }
  }
  return (
    <Grid container spacing={2} justifyContent="space-evenly" alignItems="stretch">
      {dronesList.map(drone => (
        <Grid key={drone.reference} item xs={6} sm={3}>
          <Card sx={{ height: '100%' }} onClick={() => handleClick(drone.reference)}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="200"
                sx={{ objectFit: 'contain' }}
                image={drone.image}
                alt={drone.reference}
              />
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography gutterBottom variant="h6">
                  {drone.reference}
                </Typography>
                <Typography gutterBottom fontWeight="light" variant="subtitle1">
                  {drone.brand}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

DroneCard.propTypes = {
  dronesList: PropTypes.arrayOf(
    PropTypes.shape({
      reference: PropTypes.string,
      brand: PropTypes.string,
      quantity: PropTypes.number,
      price: PropTypes.number,
      description: PropTypes.string,
      image: PropTypes.string,
    }),
  ),
};

DroneCard.defaultProps = {
  dronesList: [],
};

export default DroneCard;
