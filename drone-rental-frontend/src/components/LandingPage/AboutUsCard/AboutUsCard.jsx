import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import React from 'react';
import LandingCardLayout from '../../Shared/Layout/LandingCardLayout';
import information from '../../../services/mock/aboutus';

function AboutUsCard() {
  return (
    <LandingCardLayout backgroundColor="primary.light" title="Acerca de nosotros">
      <Grid container spacing={3} justifyContent="space-between" alignItems="stretch">
        {information.map(elem => (
          <Grid key={elem.name} item xs={12} sm={6} md={6}>
            <Card sx={{ height: '100%', display: 'flex' }}>
              <CardMedia
                sx={{ width: '20%', objectFit: 'contain', margin: '20px' }}
                component="img"
                image={elem.url}
                alt={elem.name}
              />
              <CardContent>
                <Typography variant="h6" color="primary.dark">
                  {elem.name}
                </Typography>
                <Typography variant="subtitle1" fontWeight="light">
                  {elem.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </LandingCardLayout>
  );
}

export default AboutUsCard;
