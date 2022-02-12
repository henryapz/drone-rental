import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addElements(state, action) {
      const { payload } = action;
      state.push(payload);
    },
  },
});

const { actions, reducer } = cartSlice;

export const { addElements } = actions;

export default reducer;
