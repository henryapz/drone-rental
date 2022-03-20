import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import categoriesReducer from './slices/categoriesSlice';
import dronesReducer from './slices/dronesSlice';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    categories: categoriesReducer,
    drones: dronesReducer,
    user: userReducer,
  },
});

export default store;
