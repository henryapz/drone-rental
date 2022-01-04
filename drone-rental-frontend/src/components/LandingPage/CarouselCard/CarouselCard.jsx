import { Box, Card, CardMedia, Container, Typography } from '@mui/material';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import banners from '../../../services/mock/carousel';
import styles from './CarouselCard.module.scss';

function CarouselCard() {
  return (
    <Box pt={4} pb={4}>
      <Container>
        <Carousel navButtonsAlwaysVisible="true">
          {banners.map(item => (
            <Card key={item.name}>
              <CardMedia component="img" height="500" image={item.img} alt={item.name} />
              <Box className={styles.carousel__text}>
                <Typography color="secondary.light" variant="h3" textAlign="center">
                  {item.name}
                </Typography>
                <Typography color="secondary.light" variant="h5" textAlign="center">
                  {item.description}
                </Typography>
              </Box>
            </Card>
          ))}
        </Carousel>
      </Container>
    </Box>
  );
}

export default CarouselCard;
