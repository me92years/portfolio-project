import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { LoginState } from './loginSlice'

export const loginApi = createApi({
  reducerPath: 'login/submit',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json')
    }
  }),
  endpoints: (builder) => ({
    login: builder.mutation<number, LoginState>({
      query: (data: LoginState) => ({
        url: '/users/login',
        method: 'post',
        body: data,
        credentials: 'include'
      })
    })
  })
});

export const { useLoginMutation } = loginApi;