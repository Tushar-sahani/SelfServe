import { configureStore } from "@reduxjs/toolkit";
import filterTabSlice from "./slices/filterTabSlice";
import authSlice from "./slices/authSlice";
export const store = configureStore({
  reducer: {
    filter: filterTabSlice,
    auth: authSlice,
  },
});
