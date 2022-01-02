import React from 'react';
import { Card, CardMedia, Typography, CardActionArea, Grid } from '@mui/material';
import categories from '../../../services/mock/categories';
import LandingCardLayout from '../../Shared/Layout/LandingCardLayout';
import styles from './CategoryCard.module.css';

function CategoryCard() {
  return (
    <LandingCardLayout
      backgroundColor="secondary.light"
      title="Disponibles para múltiples entornos"
    >
      <Grid container justifyContent="space-between" alignItems="stretch">
        {categories.map(category => (
          <Grid key={category.name} item xs={12} sm={6} md={4}>
            <Card sx={{ borderRadius: '0' }}>
              <CardActionArea>
                <CardMedia
                  className={styles.category__image}
                  component="img"
                  image={category.url}
                  alt={category.name}
                />
                <Typography
                  color="secondary.light"
                  className={styles.category__title}
                  variant="h6"
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
