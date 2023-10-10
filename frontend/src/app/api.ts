import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { LoginState, UserState } from './states';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    login: builder.mutation<number, LoginState>({
      query: (data: LoginState) => ({
        url: '/users/login',
        method: 'post',
        body: data,
        headers: [
          ['Content-Type', 'application/json']
        ]
      })
    }),
    auth: builder.query<UserState, void>({
      query: () => ({
        url: '/users/auth',
        method: 'get',
      })
    }),
    logout: builder.query<number, void>({
      query: () => ({
        url: '/users/logout',
        method: 'get',
      })
    })
  })
});

export const { useLoginMutation, useLazyAuthQuery, useLazyLogoutQuery } = api;
