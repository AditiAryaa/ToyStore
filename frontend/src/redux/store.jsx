import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.jsx";
import productReducer from "./productSlice.jsx";

export const store = configureStore({
  reducer: {
    user: authReducer,
    product: productReducer,
  },
});

export default store;
