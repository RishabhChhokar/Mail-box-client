import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  error: null,
  isLogged: localStorage.getItem("isLogged") === "true",
  token: localStorage.getItem("userToken") || null,
  userEmail: localStorage.getItem("userEmail") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.token = action.payload.accessToken;
      state.userEmail = action.payload.email;

      localStorage.setItem("userToken", action.payload.accessToken);
      localStorage.setItem("userEmail", action.payload.email);
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
    setLoggedStatus(state, action) {
      state.isLogged = action.payload;
      localStorage.setItem("isLogged", action.payload);
    },
    resetAuth(state) {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.isLogged = false;
      state.token = null;
      state.userEmail = null;

      localStorage.removeItem("isLogged");
      localStorage.removeItem("userToken");
      localStorage.removeItem("userEmail");
    },
  },
});

export const {
  setUser,
  setLoading,
  setError,
  clearError,
  setLoggedStatus,
  resetAuth,
} = authSlice.actions;
export default authSlice.reducer;
