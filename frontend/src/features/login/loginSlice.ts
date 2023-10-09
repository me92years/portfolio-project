import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface LoginState {
  username: string;
  password: string;
  social: string;
};

const initialState: LoginState = {
  username: '',
  password: '',
  social: 'NONE',
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    dispatchUsername: (state, action) => {
      state.username = action.payload;
    },
    dispatchPassword: (state, action) => {
      state.password = action.payload;
    },
    resetState: (state) => {
      state.username = '';
      state.password = '';
    }
  }
});

export const selectLoginState = (state: RootState) => state.login;
export const { dispatchUsername, dispatchPassword, resetState } = loginSlice.actions;
export default loginSlice.reducer;

