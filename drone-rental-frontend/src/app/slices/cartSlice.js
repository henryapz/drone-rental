/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  total: 0,
  delivery: 5.5,
  products: [],
  order: {
    status: '',
    data: {},
  },
};

export const createOrder = createAsyncThunk('orders', async payload => {
  try {
    const orders = await axios.post('http://localhost:8080/api/orders/', {
      ...payload,
    });
    return orders.data;
  } catch (error) {
    throw new Error(error);
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addElements(state, action) {
      const { payload } = action;
      const productFound = state.products.find(
        product =>
          product.ref === payload.ref &&
          product.initialDate === payload.initialDate &&
          product.finalDate === payload.finalDate,
      );
      if (productFound) {
        if (productFound.quantity >= productFound.maxQuantity) return;
        productFound.quantity += 1;
        productFound.subtotal =
          productFound.quantity * productFound.price * productFound.days;
      } else {
        payload.subtotal = payload.quantity * payload.price * payload.days;
        state.products.push(payload);
      }
    },
    substractToElement(state, action) {
      const { payload } = action;
      const productFound = state.products.find(
        product =>
          product.ref === payload.ref &&
          product.initialDate === payload.initialDate &&
          product.finalDate === payload.finalDate,
      );
      if (!productFound || productFound.quantity === 1) return;
      productFound.quantity -= 1;
      productFound.subtotal =
        productFound.quantity * productFound.price * productFound.days;
    },
    deleteElement(state, action) {
      const { payload } = action;
      state.products = state.products.filter(product => product.ref !== payload.ref);
      state.total -= payload.subtotal;
    },
    addQuantity(state, action) {
      const { payload } = action;
      state.products = state.products.filter(product => product.ref !== payload.ref);
      state.total -= payload.subtotal;
    },
    updateTotal(state, action) {
      state.total += action.payload;
    },
    resetCart() {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder.addCase(createOrder.fulfilled, state => {
      state.newDrone.status = 'fulfilled';
    });
  },
});

const { actions, reducer } = cartSlice;

export const { addElements, substractToElement, deleteElement, resetCart } = actions;

export default reducer;
