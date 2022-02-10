import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import React, { useState } from 'react';
import categories from '../../services/mock/categories';

function DronesFilter() {
  const [checked, setChecked] = useState([true, false]);
  const handleChange1 = event => {
    setChecked([event.target.checked, event.target.checked]);
  };
  const handleChange2 = event => {
    setChecked([event.target.checked, checked[1]]);
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
            checked={checked[0] && checked[1]}
            indeterminate={checked[0] !== checked[1]}
            onChange={handleChange1}
          />
        }
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
        {categories.map(category => (
          <FormControlLabel
            label={category.name}
            control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
          />
        ))}
      </Box>
    </Box>
  );
}

export default DronesFilter;
