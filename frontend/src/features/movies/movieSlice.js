import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import movieService from "./movieService";

const initialState = {
    movies: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

//Add Movie
export const addMovie = createAsyncThunk("/addMovie", async (movieData, thunkAPI) =>{
    try{
        const token = thunkAPI.getState().auth.user.token;
        return await movieService.addMovie(movieData, token);
    }catch(error){
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
})

//Delete Movie
export const deleteMovie = createAsyncThunk("movies/delete", async (id, thunkAPI) =>{
  try{
      const token = thunkAPI.getState().auth.user.token;
      return await movieService.deleteMovie(id, token);
  }catch(error){
      const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//Rate Movie
export const rateMovie = createAsyncThunk("movies/rate", async (movieData, thunkAPI) =>{
  try{
      const token = thunkAPI.getState().auth.user.token;
      return await movieService.rateMovie(movieData, token);
  }catch(error){
      const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const getMyMovies = createAsyncThunk("movies/getMine", async (_, thunkAPI) => {
  try{
      const token = thunkAPI.getState().auth.user.token;
      return await movieService.getMyMovies(token);
  }catch(error){
      const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})
export const getUserMovies = createAsyncThunk("movies/getUsers", async (userName, thunkAPI) => {
  try{
      const token = thunkAPI.getState().auth.user.token;
      return await movieService.getUserMovies(userName, token);
  }catch(error){
      const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})



export const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
      .addCase(addMovie.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.movies.push(action.payload)
      })
      .addCase(addMovie.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })  
      .addCase(getMyMovies.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMyMovies.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(getMyMovies.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteMovie.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.movies = state.movies.filter((movie) => movie._id !== action.payload.id)
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(rateMovie.pending, (state) => {
        state.isLoading = true
      })
      .addCase(rateMovie.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
       
      })
      .addCase(rateMovie.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getUserMovies.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserMovies.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(getUserMovies.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
    }
})

export const {reset} = movieSlice.actions;
export default movieSlice.reducer;