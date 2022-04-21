import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, Typography, CardActionArea, Grid } from '@mui/material';
import LandingCardLayout from '../../Shared/Layout/LandingCardLayout';
import styles from './CategoryCard.module.scss';
import LottieComponent from '../../Shared/LottieComponent/LottieComponent';

function CategoryCard() {
  const categories = useSelector(state => state.categories.data);
  const navigate = useNavigate();

  const handleClick = route => {
    navigate(`/categoria/${route.toLowerCase()}`);
  };

  return (
    <LandingCardLayout
      backgroundColor="secondary.light"
      title="Disponibles para múltiples entornos"
    >
      <Grid container justifyContent="space-between" alignItems="stretch">
        {categories?.map(category => (
          <Grid key={category.name} item xs={12} sm={6} md={4}>
            <Card
              id={`category-${category.name}`}
              sx={{ borderRadius: '0', height: '250px', margin: '0.8em' }}
              onClick={() => handleClick(category.name)}
            >
              <CardActionArea>
                <LottieComponent url={category.animationUrl} />
                <Typography
                  color="primary.dark"
                  className={styles.category__title}
                  variant="h6"
                  sx={{ fontWeight: '700' }}
                >
                  {category.name}
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </LandingCardLayout>
  );
}

export default CategoryCard;
