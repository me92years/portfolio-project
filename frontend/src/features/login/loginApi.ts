import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginRequest } from './loginSlice';

export const loginApi = createApi({
  reducerPath: 'loginApi',

  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),

  endpoints: (builder) => ({
    requestLogin: builder.mutation<number, LoginRequest>(({
      query: (loginState) => ({
        url: '/users/login',
        method: 'post',
        body: loginState,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    })),
  }),
})

export const { useRequestLoginMutation } = loginApi;