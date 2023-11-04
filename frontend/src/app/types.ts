import { MouseEvent } from 'react';

// 게시물 요청 
export type PostReqDto = {
  pid?: number;
  category?: string;
  keyword?: string;
}

// 게시물 추가
export type PostPutDto = {
  pid: number;
  title: string;
  innerText: string;
}

// 단일 댓글
export type CommentGetDto = {
  pid: number;
  parentPid: number;
  writerName: string;
  writerEmail: string;
  writerImage: string;
  innerText: string;
  regDate: string;
  modDate: string;
}

// 단일 게시물
export type PostGetDto = {
  pid: number;
  title: string;
  innerText: string;
  writerName: string;
  writerEmail: string;
  writerImage: string;
  regDate: string;
  modDate: string;
  comments: CommentGetDto[]
}

// 페이지
export type PostResDto = {
  dtoList: PostGetDto[];
  totalPages: number;
  page: number;
  size: number;
  start: number;
  end: number;
  prev: boolean;
  next: boolean;
  pageList: number[]
};


// 인증 회원
export type UserPrincipal =
  | null
  | {
    id: number;
    email: string;
    profileImage: string;
    profileName: string;
    roleTitle: string;
  }

export type ButtonMouseEvent = MouseEvent<HTMLButtonElement, globalThis.MouseEvent>;
export type HeadingMouseEvent = MouseEvent<HTMLHeadingElement, globalThis.MouseEvent>;