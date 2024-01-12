import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./login";
import cartSlice from "./cart";

const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    cart: cartSlice.reducer
  },
});

export default store;
