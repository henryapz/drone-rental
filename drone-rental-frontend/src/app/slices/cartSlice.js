/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  total: 0,
  products: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addElements(state, action) {
      const { payload } = action;
      state.products.push(payload);
    },
    updateTotal(state, action) {
      state.total += action.payload;
    },
    resetCart() {
      return initialState;
    },
  },
});

const { actions, reducer } = cartSlice;

export const { addElements, updateTotal, resetCart } = actions;

export default reducer;
