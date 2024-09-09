import { configureStore } from "@reduxjs/toolkit";
import filterTabSlice from "./slices/filterTabSlice";
import authSlice from "./slices/authSlice";
import handelLoginSlice from "./slices/handelLoginSlice";
export const store = configureStore({
  reducer: {
    filter: filterTabSlice,
    auth: authSlice,
    loginModal:handelLoginSlice,
  },
});
