import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: '',
  data: [],
  filteredData: [],
  selectedFilters: [],
};

export const getAllDrones = createAsyncThunk('drones/getAll', async () => {
  try {
    const drones = await axios.get('http://localhost:8080/api/drones');
    return drones.data;
  } catch (error) {
    throw new Error(error);
  }
});

const dronesSlice = createSlice({
  name: 'drones',
  initialState,
  reducers: {
    filterData(state) {
      state.filteredData = state.data.filter(element =>
        state.selectedFilters.includes(element.category_id.name),
      );
    },
    addFilter(state, action) {
      const name = action.payload;
      state.selectedFilters.push(name);
    },
    removeFilter(state, action) {
      const name = action.payload;
      const index = state.selectedFilters.indexOf(name);
      state.selectedFilters.splice(index, 1);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAllDrones.pending, state => {
        state.status = 'loading';
      })
      .addCase(getAllDrones.rejected, state => {
        state.status = 'rejected';
      })
      .addCase(getAllDrones.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.data = [...action.payload];
      });
  },
});

export const { filterData, addFilter, removeFilter, extraReducers } = dronesSlice.actions;
export default dronesSlice.reducer;
