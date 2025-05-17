import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAdminExist: false,
  admin: {},
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    saveAdmin: (state, action) => {
      (state.isAdminExist = true), (state.user = action.payload);
    },
    clearAdmin: (state) => {
      (state.isAdminExist = false), (state.user = {});
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveAdmin, clearAdmin } = adminSlice.actions;

export default adminSlice.reducer;