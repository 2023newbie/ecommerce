import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: { isLogin: false, info: {} },
  reducers: {
    ON_LOGIN(state, action) {
      state.isLogin = true;
      state.info = action.payload;
    },
    ON_LOGOUT(state) {
      state.isLogin = false;
      state.info = {};
    },
  },
});

export const loginActions = loginSlice.actions;
export default loginSlice;
