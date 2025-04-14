// app/redux/authApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://127.0.0.1:8000/api/',
  }),
  credentials: 'include',
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth/login/',
        method: 'POST',
        body: credentials,
      }),
    }),
    refreshToken: builder.mutation({
      query: (refreshToken) => ({
        url: 'auth/token/refresh/',
        method: 'POST',
        body: { refresh: refreshToken },
      }),
    }),
  }),
});

export const { 
  useLoginMutation,
  useRefreshTokenMutation 
} = authApi;