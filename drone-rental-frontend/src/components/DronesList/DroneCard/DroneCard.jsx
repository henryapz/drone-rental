import React from 'react';
import {
  Card,
  Container,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
} from '@mui/material';
import drones from '../../../services/mock/drones';

function DroneCard() {
  return (
    <Container
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        width: '100%',
        margin: '1rem auto',
      }}
    >
      {drones.map(category => (
        <Card
          key={category.reference}
          raised
          sx={{
            width: '360px',
            height: '400px',
            marginTop: '1rem',
            display: 'flex',
            flexDirection: 'column',
            justfyContent: 'center',
            alignItems: 'space-around',
            borderRadius: '19px',
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="300"
              image={category.image}
              alt={category.reference}
            />
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography gutterBottom variant="h5">
                {category.reference}
              </Typography>
              <Typography gutterBottom variant="h6">
                {category.brand}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Container>
  );
}

export default DroneCard;
