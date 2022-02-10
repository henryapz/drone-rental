import React from 'react';
import {
  Typography,
  Container,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Pagination,
} from '@mui/material';
import DroneCard from '../../components/DronesList/DroneCard';
import DronesFilter from '../../components/DronesList/DronesFilter';

function DronesList() {
  return (
    <Box sx={{ pt: '50px', pb: '50px' }}>
      <Container maxWidth="xl">
        <Box display="flex" pb={2} alignItems="center">
          <Typography flex="1 1 100%" gutterBottom variant="h4" component="div">
            Drones
          </Typography>
          <Box>
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Ordenar por</InputLabel>
              <Select label="Ordenar por" autoWidth>
                <MenuItem value={1}>Precio mayor a menor</MenuItem>
                <MenuItem value={2}>Precio menor a mayor</MenuItem>
                <MenuItem value={3}>Modelo - cambiar a A a Z</MenuItem>
                <MenuItem value={4}>Modelo - cambiar a Z a A</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box display="flex" gap={5}>
          <DronesFilter />
          <DroneCard />
        </Box>
        <Stack spacing={2} mt={3}>
          <Pagination
            count={10}
            variant="outlined"
            shape="rounded"
            sx={{ margin: 'auto' }}
          />
        </Stack>
      </Container>
    </Box>
  );
}

export default DronesList;
