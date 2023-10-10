import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import loginReducer from '../features/login/loginSlice';

export const store = configureStore({
  reducer: {
    'login': loginReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(api.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;