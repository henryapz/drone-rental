import React, { useState, useEffect } from 'react';
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
  Grid,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { sortDrones, getDronesByPage } from '../../app/slices/dronesSlice';
import DroneCard from '../../components/DronesList/DroneCard';
import DronesFilter from '../../components/DronesList/DronesFilter';
import Loader from '../../components/Shared/Loader/Loader';

function DronesList() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectOption, setSelectOption] = useState(1);
  const [pageOptions, setPageOptions] = useState({ page: 1, perPage: 8 });
  const drones = useSelector(state => state.drones);
  const dronesFilteredList = useSelector(state => state.drones.filteredData);
  const dronesToRender = dronesFilteredList.length ? dronesFilteredList : drones.data;
  const dispatch = useDispatch();

  const handleChange = e => {
    const { value } = e.target;
    setSelectOption(value);
    dispatch(sortDrones({ value }));
  };

  const handlePageChange = (e, value) => {
    setPageOptions({ ...pageOptions, page: value });
  };

  useEffect(() => {
    dispatch(getDronesByPage(pageOptions));
  }, [pageOptions, dispatch]);

  useEffect(() => {
    if (drones.status === 'fulfilled') setIsLoading(false);
  }, [drones]);

  useEffect(() => {
    dispatch(sortDrones({ value: 1 }));
  }, [isLoading, dispatch]);
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
              <Select
                label="Ordenar por"
                value={selectOption}
                onChange={handleChange}
                autoWidth
              >
                <MenuItem value={1}>Modelo - cambiar a A a Z</MenuItem>
                <MenuItem value={2}>Modelo - cambiar a Z a A</MenuItem>
                <MenuItem value={3}>Precio mayor a menor</MenuItem>
                <MenuItem value={4}>Precio menor a mayor</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box display={{ xs: 'block', sm: 'flex' }} gap={5}>
          <DronesFilter />
          {isLoading ? (
            <Loader />
          ) : (
            <Grid
              container
              spacing={2}
              justifyContent="space-evenly"
              alignItems="stretch"
            >
              {dronesToRender.map(element => (
                <DroneCard key={element._id} drone={element} />
              ))}
            </Grid>
          )}
        </Box>
        <Stack spacing={2} mt={3}>
          <Pagination
            count={drones.pages}
            page={pageOptions.page}
            variant="outlined"
            shape="rounded"
            sx={{ margin: 'auto' }}
            onChange={handlePageChange}
          />
        </Stack>
      </Container>
    </Box>
  );
}

export default DronesList;
