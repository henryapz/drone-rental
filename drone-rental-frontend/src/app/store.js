import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import categoriesReducer from './slices/categoriesSlice';
import dronesReducer from './slices/dronesSlice';
import userReducer from './slices/userSlice';
import orderReducer from './slices/orderSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    categories: categoriesReducer,
    drones: dronesReducer,
    user: userReducer,
    order: orderReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
