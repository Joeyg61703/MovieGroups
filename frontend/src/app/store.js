import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/auth/authSlice";
import goalReducer from '../features/goals/goalSlice';
import movieReducer from '../features/movies/movieSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
    movies: movieReducer,
  },
});
