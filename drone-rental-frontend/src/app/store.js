import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import categoriesReducer from './slices/categoriesSlice';
import dronesReducer from './slices/dronesSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    categories: categoriesReducer,
    drones: dronesReducer,
  },
});

export default store;
