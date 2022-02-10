import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  Grid,
} from '@mui/material';
import drones from '../../services/mock/drones';

function DroneCard() {
  const navigate = useNavigate();

  function handleClick(reference) {
    navigate(`./${reference}`);
  }
  return (
    <Grid container spacing={2} alignItems="stretch">
      {drones.map(drone => (
        <Grid key={drone.reference} item xs={6} sm={3}>
          <Card sx={{ height: '100%' }} onClick={() => handleClick(drone.reference)}>
            <CardActionArea sx={{ height: '100%' }}>
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

export default DroneCard;
