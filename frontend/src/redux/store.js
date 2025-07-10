import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import roomSlice from './roomSlice'

export const store= configureStore({
  reducer: {
    auth: authReducer,
    room: roomSlice,
  },
});
