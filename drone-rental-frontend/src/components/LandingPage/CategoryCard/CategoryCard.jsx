import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, Typography, CardActionArea, Grid } from '@mui/material';
// import categories from '../../../services/mock/categories';
import LandingCardLayout from '../../Shared/Layout/LandingCardLayout';
import styles from './CategoryCard.module.scss';
import LottieComponent from '../../Shared/LottieComponent/LottieComponent';
// import getAllCategories from '../../../services/api/categories';

function CategoryCard() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const handleClick = route => {
    navigate(`/categoria/${route.toLowerCase()}`);
  };

  // TODO: Pasar esto a Reduxthunk
  useEffect(() => {
    async function getAllCategories() {
      try {
        const response = await axios.get('http://localhost:8080/api/categories');
        // TODO: Crear estado en redux
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAllCategories();
    // setCategories(data);
  }, []);

  return (
    <LandingCardLayout
      backgroundColor="secondary.light"
      title="Disponibles para múltiples entornos"
    >
      <Grid container justifyContent="space-between" alignItems="stretch">
        {categories?.map(category => (
          <Grid key={category.name} item xs={12} sm={6} md={4}>
            <Card
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
