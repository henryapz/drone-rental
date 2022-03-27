import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  filterData,
  addFilter,
  removeFilter,
  addAllToFilter,
} from '../../app/slices/dronesSlice';
import {
  checkField,
  checkAllFields,
  unCheckAllFields,
} from '../../app/slices/categoriesSlice';

function DronesFilter() {
  const [allCategoriesCheck, setAllCategoriesCheck] = useState(false);
  const categories = useSelector(state => state.categories);
  const dispatch = useDispatch();

  const handleChange1 = () => {
    setAllCategoriesCheck(!allCategoriesCheck);
    if (allCategoriesCheck) {
      dispatch(unCheckAllFields());
    } else {
      dispatch(checkAllFields());
      dispatch(addAllToFilter(categories.data));
    }
    dispatch(filterData());
  };
  const handleCheck = category => {
    const { name, checked } = category;
    dispatch(checkField(name));
    if (checked) {
      dispatch(removeFilter(name));
    } else {
      dispatch(addFilter(name));
    }
    dispatch(filterData());
  };
  return (
    <Box>
      <Typography gutterBottom variant="h6">
        Filtros
      </Typography>
      <FormControlLabel
        label="Categorías"
        control={
          <Checkbox
            checked={allCategoriesCheck}
            indeterminate={allCategoriesCheck}
            onChange={handleChange1}
          />
        }
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
        {categories.data.map(category => (
          <FormControlLabel
            label={category.name}
            key={category.name}
            control={
              <Checkbox
                checked={category.checked}
                disabled={category.disabled}
                onChange={() => handleCheck(category)}
              />
            }
          />
        ))}
      </Box>
    </Box>
  );
}

export default DronesFilter;
