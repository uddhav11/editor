import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000'; // Adjust as needed
axios.defaults.withCredentials = true;

export const executeCode = createAsyncThunk(
  'execution/executeCode',
  async ({ sourceCode, language, stdin, roomId }, { getState }) => {
    try {
      const { auth } = getState();
      const response = await axios.post('/api/code/execute', {
        sourceCode,
        language,
        stdin,
        roomId
      }, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
);

export const getRoomSubmissions = createAsyncThunk(
  'execution/getRoomSubmissions',
  async (roomId, { getState }) => {
    try {
      const { auth } = getState();
      const response = await axios.get(`/api/code/room/${roomId}/submissions`, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
);

const executionSlice = createSlice({
  name: 'execution',
  initialState: {
    output: null,
    isLoading: false,
    error: null,
    submissions: [],
    currentSubmission: null
  },
  reducers: {
    clearOutput: (state) => {
      state.output = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(executeCode.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(executeCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.output = action.payload;
        state.currentSubmission = action.payload;
      })
      .addCase(executeCode.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getRoomSubmissions.fulfilled, (state, action) => {
        state.submissions = action.payload;
      });
  }
});

export const { clearOutput } = executionSlice.actions;
export default executionSlice.reducer;