import React from 'react';
import { PropTypes } from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  Grid,
} from '@mui/material';

function DroneCard({ drone }) {
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
    <Grid item xs={6} sm={3}>
      <Card sx={{ height: '100%' }} onClick={() => handleClick(drone.model)}>
        <CardActionArea sx={{ height: '100%' }}>
          <CardMedia
            component="img"
            height="200"
            sx={{ objectFit: 'contain' }}
            image={drone.productImage.secure_url}
            alt={drone.model}
          />
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography gutterBottom variant="h6">
              {drone.model}
            </Typography>
            <Typography gutterBottom fontWeight="light" variant="subtitle1">
              {drone.brand}
            </Typography>
            <Typography gutterBottom fontWeight="500" fontStyle="italic" variant="body2">
              {`$${drone.pricePerDay}`}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

DroneCard.propTypes = {
  drone: PropTypes.shape({
    model: PropTypes.string,
    brand: PropTypes.string,
    description: PropTypes.string,
    productImage: PropTypes.shape({
      secure_url: PropTypes.string,
    }),
    quantity: PropTypes.number,
    pricePerDay: PropTypes.number,
    pricePerWeek: PropTypes.number,
    pricePerMonth: PropTypes.number,
    category_id: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
};

DroneCard.defaultProps = {
  drone: {
    model: '',
    brand: '',
    description: '',
    productImage: {
      secure_url: '',
    },
    quantity: 0,
    pricePerDay: 0,
    pricePerWeek: 0,
    pricePerMonth: 0,
    category_id: {
      name: '',
    },
  },
};

export default DroneCard;
