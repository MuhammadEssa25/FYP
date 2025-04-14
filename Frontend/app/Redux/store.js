// app/Redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from './productsApi ';
import { authApi } from './authApi';
import { baseQueryWithReauth } from './baseQueryWithReauth';

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productsApi.middleware)
      .concat(authApi.middleware), // Add authApi middleware
});