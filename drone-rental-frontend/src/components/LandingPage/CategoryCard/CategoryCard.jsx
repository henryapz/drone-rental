import React from 'react';
import {
  Card,
  Container,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import categories from '../../../services/mock/categories';

function CategoryCard() {
  const theme = useTheme();
  return (
    <Container
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100%',
        margin: '1rem auto',
      }}
    >
      {categories.map(category => (
        <Card
          raised
          sx={{
            width: '360px',
            height: '300px',
            marginTop: '0.1rem',
            display: 'flex',
            flexDirection: 'column',
            justfyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.pallete.darkBg,
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="230"
              image={category.url}
              alt={category.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {category.name}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Container>
  );
}

export default CategoryCard;
