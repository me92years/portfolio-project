import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface LoginRequest {
  username: string;
  password: string;
  social: string,
};

const initialState: LoginRequest = {
  username: '',
  password: '',
  social: 'NONE',
};

export const loginSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    dispatchUsername: (state, action) => {
      state.username = action.payload;
    },
    dispatchPassword: (state, action) => {
      state.password = action.payload;
    },
    dispatchReset: (state) => {
      state.username = '';
      state.password = '';
    }
  }
});

export const selectLoginState = (state: RootState) => state.login;
export const { dispatchUsername, dispatchPassword, dispatchReset } = loginSlice.actions;