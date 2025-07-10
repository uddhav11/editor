// redux/authSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useRouteError } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:4000"; // the base URL as needed
axios.defaults.withCredentials = true;
// const navigate = useNavigate();

const initialState = {
  user: null,
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
  loading: false,
  tempEmail: "",
  tempToken: "",
};

const saveUserToLocalStorage = (user, token) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
};

const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

const registerEmailLocalStorage = (email) => {
  localStorage.setItem("tempEmail", email);
};

const removeEmailLocalStorage = () => {
  localStorage.removeItem("tempEmail");
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/auth/register", userData);
      if (res.status === 200) {
        registerEmailLocalStorage(userData.email);
        // navigate("/register/verify");
      }
      console.log(res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "registration failed"
      );
    }
  }
);

export const verifyRegister = createAsyncThunk(
  "auth/verifyregister",
  async ({ otp }, { rejectWithValue }) => {
    try {
      const email = localStorage.getItem("tempEmail");
      if (!email || !otp) {
        return rejectWithValue("Email and OTP are required");
      }

      const res = await axios.post("/api/auth/verify-register", { email, otp });
      if (res.status === 200) {
        removeEmailLocalStorage();
        // navigate("/login");
      }

      console.log(res.data);

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "register verification failed"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post("api/auth/login", userData);
            console.log(res.data);

      if (res.status === 200) {
        registerEmailLocalStorage(userData.email);
        // navigate("/login/verify");
      }

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "login failed");
    }
  }
);

export const verifyLogin = createAsyncThunk(
  "auth/verifylogin",
  async ({ otp }, { rejectWithValue }) => {
    try {
      const email = localStorage.getItem("tempEmail");
      if (!email || !otp) {
        return rejectWithValue("Email and OTP are required");
      }
      const res = await axios.post("api/auth/verify-login", { email, otp });
      if (res.status === 200) {
        removeEmailLocalStorage();
        saveUserToLocalStorage(res.data.user, res.data.token);
      }
      console.log(res.data);

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "login verification failed"
      );
    }
  }
);

export const getProfile = createAsyncThunk(
  "auth/profile",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token || localStorage.getItem("token");

      if (!token) {
        return rejectWithValue("no authentication token provided");
      }

      const res = await axios.get("/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      // navigate('/dashboard')
      console.log("this is the getProfile", res.data);

      return res.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "failed to fetch profile data"
      );
    }
  }
);




export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/auth/logout", null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
      // if (res.status === 200) {
        removeUserFromLocalStorage();
        // navigate('/login');
      // }
      console.log(res.data);

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "user logout failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      removeUserFromLocalStorage();
      removeEmailLocalStorage();
    },

    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      saveUserToLocalStorage(action.payload.user, action.payload.token);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(verifyRegister.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(verifyRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(verifyLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        saveUserToLocalStorage(action.payload.user, action.payload.token);
        state.message = action.payload.message;
      })
      .addCase(verifyLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.loading = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
