import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  Grid,
} from '@mui/material';
import { filterByCategory } from '../../app/slices/dronesSlice';

function DroneCard({ drone }) {
  const filteredCategories = useSelector(state => state.categories.selectedFilters);
  const navigate = useNavigate();
  const currentUrl = useLocation();
  const dispatch = useDispatch();

  function handleClick(reference) {
    if (currentUrl.pathname === '/drones') {
      navigate(`./${reference}`);
    } else {
      navigate(`../drones/${reference}`, { options: { replace: true } });
    }
  }

  useEffect(() => {
    if (filteredCategories.length) {
      dispatch(filterByCategory(drone.category_id.name));
    }
  }, [filteredCategories, dispatch]);

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
  drone: {},
};

export default DroneCard;
