import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  error: null,
  isLogged: localStorage.getItem("isLogged") === "true",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
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
  },
});

export const { setUser, setLoading, setError, clearError, setLoggedStatus } = authSlice.actions;
export default authSlice.reducer;
