import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AuthResponse } from './authSlice';

export const authApi = createApi({
  reducerPath: 'authApi',

  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),

  endpoints: (builder) => ({
    response: builder.query<AuthResponse, void>(({
      query: () => ({
        url: '/users/auth',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    })),
  }),
})

export const { useLazyResponseQuery } = authApi;