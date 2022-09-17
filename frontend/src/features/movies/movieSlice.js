import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import movieService from "./movieService";

const initialState = {
    movies: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

//Create new goal
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
    }
})

export const {reset} = movieSlice.actions;
export default movieSlice.reducer;