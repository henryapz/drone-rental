import { Box, Card, CardContent, Grid } from '@mui/material';
import React from 'react';
import steps from '../../../services/mock/steps';
import LandingCardLayout from '../../Shared/Layout/LandingCardLayout';
import LottieComponent from '../../Shared/LottieComponent/LottieComponent';

function ServiceStepCard() {
  return (
    <LandingCardLayout
      backgroundColor="secondary.light"
      title="¿Como funciona el servicio de alquiler de drones?"
    >
      <Box
        color="primary.main"
        textAlign="center"
        typography="h6"
        fontWeight="bold"
        mb={2}
      >
        Existen cinco sencillos pasos para alquilar un dron
      </Box>
      <Grid container spacing={1} justifyContent="space-between" alignItems="stretch">
        {steps.map(elem => (
          <Grid key={elem.title} item xs={6} sm={4} md={2}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box
                  color="primary.dark"
                  textAlign="center"
                  typography="subtitle1"
                  fontWeight="bold"
                  mb={1}
                >
                  {elem.title}{' '}
                </Box>
              </CardContent>
              <LottieComponent url={elem.url} />
            </Card>
          </Grid>
        ))}
      </Grid>
    </LandingCardLayout>
  );
}

export default ServiceStepCard;
