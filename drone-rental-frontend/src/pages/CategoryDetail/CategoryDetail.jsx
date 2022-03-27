import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Shared/Loader/Loader';
import CategoryInfo from '../../components/CategoryDetail/CategoryInfo/CategoryInfo';

function CategoryDetail() {
  const categories = useSelector(state => state.categories);
  const { name } = useParams();
  const categoryData = categories.data?.filter(
    category => category.name.toLowerCase() === name,
  )[0];

  if (!categories.status || categories.status === 'loading') return <Loader />;

  return (
    <Container>
      <CategoryInfo data={categoryData} />
    </Container>
  );
}

export default CategoryDetail;
