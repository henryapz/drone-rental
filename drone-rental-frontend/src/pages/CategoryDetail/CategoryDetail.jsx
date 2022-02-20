import React from 'react';
import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import CategoryInfo from '../../components/CategoryDetail/CategoryInfo/CategoryInfo';
import categories from '../../services/mock/categories';

function CategoryDetail() {
  const { name } = useParams();
  const categoryData = categories.filter(
    category => category.name.toLowerCase() === name,
  )[0];
  return (
    <Container>
      <CategoryInfo data={categoryData} />
    </Container>
  );
}

export default CategoryDetail;
