import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: '',
  data: {},
};

export const createOrder = createAsyncThunk(
  'orders/create',
  async (payload, { rejectWithValue }) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${payload.token}` },
      };
      const res = await axios.post(
        'https://drone-rental-backend.herokuapp.com/api/orders/',
        payload.body,
        config,
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const getOrders = createAsyncThunk(
  'orders/get',
  async (payload, { rejectWithValue }) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${payload.token}` },
      };
      const res = await axios.get(
        `https://drone-rental-backend.herokuapp.com/api/orders/?page=${
          payload.page
        }&count=${payload.count}&orderId=${payload.order || ''}&status=${
          payload.status || ''
        }&email=${payload.email || ''}`,
        config,
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder() {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createOrder.pending, state => {
        state.status = 'loading';
      })
      .addCase(createOrder.rejected, state => {
        state.status = 'rejected';
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.data = action.payload;
      })
      .addCase(getOrders.pending, state => {
        state.status = 'loading';
      })
      .addCase(getOrders.rejected, state => {
        state.status = 'rejected';
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.data = action.payload;
      });
  },
});

const { actions, reducer } = orderSlice;

export const { resetOrder } = actions;

export default reducer;
