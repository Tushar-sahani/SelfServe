import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo: null,
    isAuthenticated: false,
    token:null,
  },
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      state.isAuthenticated = true;
      state.token = action.payload.token;
    },
    setToken:(state,action)=>{
      state.token = action.payload;
    },
    logout: (state) => {
      state.userInfo = null;
      state.isAuthenticated = false;
      state.token=null;
    },
  },
});

export const { setCredentials, logout,setToken } = authSlice.actions;
export default authSlice.reducer;
