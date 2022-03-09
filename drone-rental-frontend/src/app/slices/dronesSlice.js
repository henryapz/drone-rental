import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: '',
  data: [],
  filteredData: [],
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
    filterByCategory(state, action) {
      const category = action.payload;
      state.filteredData = state.data.filter(
        element => element.category_id.name === category,
      );
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

export const { filterByCategory, extraReducers } = dronesSlice.actions;
export default dronesSlice.reducer;
