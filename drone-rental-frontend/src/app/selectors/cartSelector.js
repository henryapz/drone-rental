import { createSelector } from '@reduxjs/toolkit';

const cartSelector = state => state.cart;

export const cartTotalSelector = createSelector(cartSelector, cart =>
  cart.products.reduce((subtotal, product) => subtotal + product.subtotal, 0),
);

export default cartTotalSelector;
