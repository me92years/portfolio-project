import { configureStore } from "@reduxjs/toolkit";
import api from "./api";
import slice from "./slice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [slice.name]: slice.reducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(
      api.middleware
    );
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;