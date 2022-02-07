import React from 'react';
import { Card, Typography, CardActionArea, Grid } from '@mui/material';
import categories from '../../../services/mock/categories';
import LandingCardLayout from '../../Shared/Layout/LandingCardLayout';
import styles from './CategoryCard.module.scss';
import LottieComponent from '../../Shared/LottieComponent/LottieComponent';

function CategoryCard() {
  return (
    <LandingCardLayout
      backgroundColor="secondary.light"
      title="Disponibles para múltiples entornos"
    >
      <Grid container justifyContent="space-between" alignItems="stretch">
        {categories.map(category => (
          <Grid key={category.name} item xs={12} sm={6} md={4}>
            <Card sx={{ borderRadius: '0', height: '250px', margin: '0.8em' }}>
              <CardActionArea>
                <LottieComponent url={category.url} />
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
