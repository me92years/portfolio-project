import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { PostReqDto, PostResDto, UserPrincipal } from './types'

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json')
    }
  }),
  endpoints: (builder) => ({
    // 게시물 가져오기
    getPosts: builder.query<PostResDto, PostReqDto>(({
      query: (req) => ({
        url: '/post/get',
        method: 'get',
        params: req
      })
    })),
    //게시물 등록하기
    putPost: builder.mutation<number, string>(({
      query: (put) => ({
        url: '/post/put',
        method: 'post',
        body: put
      })
    })),
    // 게시물 수정하기
    modPost: builder.mutation<number, string>(({
      query: (mod) => ({
        url: '/post/mod',
        method: 'post',
        body: mod
      })
    })),
    // 게시물 삭제하기
    delPost: builder.mutation<number, string>(({
      query: (del) => ({
        url: '/post/del',
        method: 'post',
        body: del
      })
    })),
    // 댓글 추가하기
    putComment: builder.mutation<number, string>(({
      query: (put) => ({
        url: '/comment/put',
        method: 'post',
        body: put
      })
    })),
    // 댓글 수정하기
    modComment: builder.mutation<number, string>(({
      query: (mod) => ({
        url: '/comment/mod',
        method: 'post',
        body: mod
      })
    })),
    delComment: builder.mutation<number, string>(({
      query: (del) => ({
        url: '/comment/del',
        method: 'post',
        body: del
      })
    })),
    // 회원 인증
    getUserPrincipal: builder.query<UserPrincipal, void>(({
      query: () => ({
        url: '/sign/auth',
        method: 'get'
      })
    })),
    // 로그아웃
    getUserLogout: builder.query<number, void>(({
      query: () => ({
        url: '/sign/out',
        method: 'get'
      })
    })),
  })
})

export default api;