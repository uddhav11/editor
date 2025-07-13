import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import roomSlice from './roomSlice'
import executionSlice from './executionSlice';

export const store= configureStore({
  reducer: {
    auth: authReducer,
    room: roomSlice,
    execution: executionSlice,
  },
});
