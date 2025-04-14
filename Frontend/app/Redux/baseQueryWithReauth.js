// app/redux/baseQueryWithReauth.js
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { authApi } from './authApi';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://127.0.0.1:8000/api/',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  
  if (result?.error?.status === 401) {
    // Try to get a new token
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: 'auth/token/refresh/',
          method: 'POST',
          body: { refresh: refreshToken },
        },
        api,
        extraOptions
      );
      
      if (refreshResult?.data) {
        // Store the new token
        localStorage.setItem('access_token', refreshResult.data.access);
        // Retry the initial query
        result = await baseQuery(args, api, extraOptions);
      } else {
        // Refresh failed - clear tokens and redirect to login
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
      }
    } else {
      // No refresh token available
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
  }
  return result;
};