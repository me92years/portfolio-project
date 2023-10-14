import { configureStore } from "@reduxjs/toolkit";
import { loginSlice } from '../features/login/loginSlice';
import { authSlice } from '../features/auth/authSlice';
import { loginApi } from "../features/login/loginApi";
import { authApi } from "../features/auth/authApi";

export const store = configureStore({
  reducer: {
    'login': loginSlice.reducer,
    'auth': authSlice.reducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(
      loginApi.middleware,
      authApi.middleware
    );
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;