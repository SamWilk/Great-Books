import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getURLConfig from "../../config/urlConfig";

// Async thunk for checking authentication (e.g., validating a token)
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    const urlObj = getURLConfig();
    try {
      const token = localStorage.getItem("token"); // Fallback to localStorage
      const userInfo = localStorage.getItem("UserInfo");

      if (!token) {
        console.log("No token");
        throw new Error("No token found");
      }
      if (!userInfo) throw new Error("No User Info Found");
      const parsedUser = JSON.parse(userInfo);

      const response = await fetch(`${urlObj.APIUrl}/getUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          UserName: parsedUser.UserName,
        }),
      });

      if (!response.ok) throw new Error("Invalid User or Token");
      const user = await response.json();
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    isAuthenticated: false,
    status: "idle", // idle | loading | success | failed
    error: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("UserInfo", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("UserInfo");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.status = "success";
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.status = "failed";
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = action.payload;
        localStorage.removeItem("token");
      });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
