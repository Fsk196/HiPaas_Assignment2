import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  users: [],
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerUser: (state, action) => {
      state.users.push(action.payload);
      state.user = action.payload;
      state.isAuthenticated = true;
      state.role = action.payload.role;
    },
    loginUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.role = action.payload.role;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.role = null;
    },
  },
});

export const { registerUser, loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
