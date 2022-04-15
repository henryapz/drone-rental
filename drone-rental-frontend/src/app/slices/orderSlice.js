import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: '',
  data: {},
};

export const createOrder = createAsyncThunk(
  'orders',
  async (payload, { rejectWithValue }) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${payload.token}` },
      };
      const res = await axios.post(
        'http://localhost:8080/api/orders/',
        payload.body,
        config,
      );
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(createOrder.pending, state => {
        state.status = 'loading';
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = 'rejected';
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.data = action.payload;
      });
  },
});

const { reducer } = orderSlice;

export default reducer;
