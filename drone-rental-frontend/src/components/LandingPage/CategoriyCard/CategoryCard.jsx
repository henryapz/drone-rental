import React from 'react';
import { Button, Box, Paper, TextField, Stack, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
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
