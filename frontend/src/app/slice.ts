import { createSlice } from "@reduxjs/toolkit";
import { UserPrincipal } from "./types";

export type DataState = {
  viewElements: JSX.Element[];
  userPrincipal: UserPrincipal
};

const initialState = {
  viewElements: [],
  userPrincipal: null
};

const slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    setViewElement: (state, action) => {
      state.viewElements = action.payload;
    },
    setUserPrincipal: (state, action) => {
      state.userPrincipal = action.payload;
    }
  }
});

export const { setViewElement, setUserPrincipal } = slice.actions;
export default slice;