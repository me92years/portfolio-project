import * as React from 'react';
import { NavigateFunction } from "react-router-dom";
import { AppDispatch } from '../app/store';
import { LoginRequest, dispatchPassword, dispatchReset, dispatchUsername } from '../features/login/loginSlice';
import { useRequestLoginMutation } from '../features/login/loginApi';

export const useLoginEvents = (
  {
    navigate,
    dispatch,
    loginRequest
  }:
    {
      navigate: NavigateFunction,
      dispatch: AppDispatch,
      loginRequest: LoginRequest
    }) => {

  const [requestLogin, { isLoading: loginLoading }] = useRequestLoginMutation();

  const status = {
    loginLoading
  };

  const events = {
    submit: async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const loginResult = await requestLogin(loginRequest).unwrap();
      if (loginResult) {
        navigate('/mediadb');
        location.reload();
      } else {
        console.log(loginResult);
        alert("로그인에 실패했습니다. 다시 로그인 해 주세요!");
        location.reload();
      }
    },

    back: (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      dispatch(dispatchReset());
      navigate('/mediadb');
    },

    changeUsername: (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      dispatch(dispatchUsername(event.target.value));
    },

    changePassword: (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      dispatch(dispatchPassword(event.target.value));
    },

  }

  return {
    status,
    events
  } as {
    status: typeof status,
    events: typeof events
  }
};

export type LoginEvents = ReturnType<typeof useLoginEvents>;