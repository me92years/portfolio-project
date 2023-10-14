import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface AuthResponse {
  email: string;
  nickname: string;
  imageUrl: string;
  role: string;
};

const initialState: AuthResponse = {
  email: '',
  nickname: '',
  imageUrl: '',
  role: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveAuthResponse: (state, action: PayloadAction<AuthResponse>) => {
      state.email = action.payload.email;
      state.imageUrl = action.payload.imageUrl;
      state.nickname = action.payload.nickname;
      state.role = action.payload.role;
    },
    resetAuthResponse: (state) => {
      state.email = '';
      state.imageUrl = '';
      state.nickname = '';
      state.role = '';
    }
  },
});

export const selectAuthData = (state: RootState) => state.auth;
export const { saveAuthResponse, resetAuthResponse } = authSlice.actions;