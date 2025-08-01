import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURLs";

// Login User Action
export const loginUserAction = createAsyncThunk(
  "users/login",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    try {
      const { data } = await axios.post(
        `${baseURL}/users/login`,
        payload,
        config
      );

      // Save loggedin user
      localStorage.setItem("userInfo", JSON.stringify(data));

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Register User Action
export const registerUserAction = createAsyncThunk(
  "users/register",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    try {
      const { data } = await axios.post(
        `${baseURL}/users/register`,
        payload,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Store data from Local Storage to userSlice
const userItemfromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : undefined;
// Login Reducer
const userLoginSlice = createSlice({
  name: "userLogin",
  initialState: {
    userAuthorisation: null,
    userLoading: false,
    userApplicationError: null,
    userSystemError: null,
    auth: null,
    users: userItemfromLocalStorage,
  },
  reducers: {
    logoutUser: (state) => {
      state.userAuthorisation = null;
      state.users = null;
      localStorage.removeItem("userInfo"); // remove from localStorage
    },
  },
  extraReducers: (builder) => {
    // Handling pending states
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.userLoading = true;
      state.userSystemError = undefined;
      state.userApplicationError = undefined;
    });
    // Handling Succcess states
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.userAuthorisation = action?.payload;
      state.userLoading = false;
      state.userSystemError = undefined;
      state.userApplicationError = undefined;
    });
    // Handling Failure states
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.userLoading = false;
      state.userSystemError = action?.payload?.message || "Login failed";
    });
  },
});

// Register user Reducer
const userRegisterSlice = createSlice({
  name: "userRegister",
  initialState: { auth: "False", users: ["Ronaldo", "Messi"] },
  extraReducers: (builder) => {
    // Handling pending states
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.userLoading = true;
      state.userSystemError = undefined;
      state.userApplicationError = undefined;
    });
    // Handling Succcess states
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.userAuthorisation = action?.payload;
      state.userLoading = false;
      state.userSystemError = undefined;
      state.userApplicationError = undefined;
    });
    // Handling Failure states
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.userLoading = false;
      state.userSystemError = action?.error?.message;
      state.userApplicationError = undefined;
    });
  },
});

export const { logoutUser } = userLoginSlice.actions;
export const userLoginReducer = userLoginSlice.reducer;
export const userRegisterReducer = userRegisterSlice.reducer;
