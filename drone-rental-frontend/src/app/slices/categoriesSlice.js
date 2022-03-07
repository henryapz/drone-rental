import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: '',
  data: [],
};

export const getAllCategories = createAsyncThunk('categories/getAll', async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/categories');
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    load() {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAllCategories.pending, state => {
        state.status = 'loading';
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.status = 'fullfiled';
        state.data = [...action.payload];
      })
      .addCase(getAllCategories.rejected, state => {
        state.status = 'rejected';
      });
  },
});

export const { load, extraReducers } = categoriesSlice.actions;
export default categoriesSlice.reducer;
