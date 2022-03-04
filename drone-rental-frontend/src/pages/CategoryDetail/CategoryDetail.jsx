import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import CategoryInfo from '../../components/CategoryDetail/CategoryInfo/CategoryInfo';
// import categories from '../../services/mock/categories';

function CategoryDetail() {
  const [categories, setCategories] = useState([]);
  const { name } = useParams();
  const categoryData = categories.filter(
    category => category.name.toLowerCase() === name,
  )[0];

  // TODO: Usar estado cargado en tienda de redux en vez de llamado a la api
  useEffect(() => {
    async function getAllCategories() {
      try {
        const response = await axios.get('http://localhost:8080/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAllCategories();
    // setCategories(data);
  }, []);

  return (
    <Container>
      <CategoryInfo data={categoryData} />
    </Container>
  );
}

export default CategoryDetail;
