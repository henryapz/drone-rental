import React from 'react';
import { Box, Paper } from '@mui/material';
import categories from '../../../services/mock/categories';

const CategoryCard = () => {
  return (
    <Box>
      {categories.map(category => {
        return (
          <Paper>
            <h2>{category}</h2>
          </Paper>
        );
      })}
    </Box>
  );
};

export default CategoryCard;
