import { Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';
import LottieComponent from '../../shared/LottieComponent/LottieComponent';
import './ServiceStepCard.scss';

function ServiceStepCard() {
  const steps = [
    {
      id: '1',
      title: '1. Elija el dron de su gusto',
      url: 'https://assets2.lottiefiles.com/packages/lf20_zunhpwue.json',
    },
    {
      id: '2',
      title: '2. Seleccione las fechas que requiera',
      url: 'https://assets3.lottiefiles.com/packages/lf20_ytg7s6tx.json',
    },
    {
      id: '3',
      title: '3. Complete el formulario de verificación',
      url: 'https://assets10.lottiefiles.com/packages/lf20_wd1udlcz.json',
    },
    {
      id: '4',
      title: '4. Verifique sus datos y vaya a pagar',
      url: 'https://assets3.lottiefiles.com/temp/lf20_4PGdiS.json',
    },
    {
      id: '5',
      title: '5. Reciba el equipo a tiempo',
      url: 'https://assets10.lottiefiles.com/packages/lf20_qjeqt7ez.json',
    },
  ];
  const separation = {
    margin: '10px 0px 0px',
  };
  const content = {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '310px',
  };
  return (
    <div className="step">
      <h2 className="step__title">¿Como funciona el servicio de alquiler de drones?</h2>
      <h3 className="step__subtitle">
        &quot;Hay cinco sencillos pasos para alquilar un dron&quot;
      </h3>
      <Grid
        container
        alignItems="center"
        spacing={1}
        rowSpacing={1}
        direction="row"
        justifyContent="space-evenly"
      >
        {steps.map(elem => (
          <Grid
            item
            component={Card}
            xs={11}
            sm={11}
            md={2}
            key={elem.id}
            style={separation}
            className="step__card"
          >
            <CardContent style={content}>
              <Typography variant="h5" component="div">
                {elem.title}
              </Typography>
              <LottieComponent url={elem.url} />
            </CardContent>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ServiceStepCard;
