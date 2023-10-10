import { configureStore } from "@reduxjs/toolkit";
import { loginApi } from "../features/login/loginApi";
import loginReducer from '../features/login/loginSlice';

export const store = configureStore({
  reducer: {
    'login': loginReducer,
    [loginApi.reducerPath]: loginApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(loginApi.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;