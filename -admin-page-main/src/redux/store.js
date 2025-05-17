import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../redux/features/adminSlice"

export const store = configureStore({
  reducer: {
    admin: adminReducer,
  },
});
