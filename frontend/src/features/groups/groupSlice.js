import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import groupService from "./groupService";

const initialState = {
    groups: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

//create nonexisting Group
export const createGroup = createAsyncThunk("/groups/create", async (groupData, thunkAPI) =>{
    try{
        const token = thunkAPI.getState().auth.user.token;
        return await groupService.createGroup(groupData, token);
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

//join exisiting group
export const joinGroup = createAsyncThunk("/groups/join", async (groupData, thunkAPI) =>{
  try{
      const token = thunkAPI.getState().auth.user.token;
      return await groupService.joinGroup(groupData, token);
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

export const leaveGroup = createAsyncThunk("groups/leave", async (name, thunkAPI) =>{
  try{
      const token = thunkAPI.getState().auth.user.token;
      return await groupService.leaveGroup(name, token);
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

export const makeOwner = createAsyncThunk("groups/makeOwner", async ({groupName, userName}, thunkAPI) =>{
  try{
    
      const token = thunkAPI.getState().auth.user.token;
      
      return await groupService.makeOwner({groupName, userName}, token);
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

export const kickUser = createAsyncThunk("groups/users/kick", async ({groupName, userName}, thunkAPI) =>{
  try{
      const token = thunkAPI.getState().auth.user.token;
      return await groupService.kickUser({groupName, userName}, token);
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

export const getMyGroups = createAsyncThunk("groups/getMine", async (_, thunkAPI) => {
  try{
      const token = thunkAPI.getState().auth.user.token;
      return await groupService.getMyGroups(token);
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

export const getAllGroups = createAsyncThunk("groups/getAll", async (_, thunkAPI) => {
  try{
      const token = thunkAPI.getState().auth.user.token;
      return await groupService.getAllGroups(token);
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

export const getGroupData = createAsyncThunk("groups/getData", async (groupName, thunkAPI) => {
  try{
      const token = thunkAPI.getState().auth.user.token;
      return await groupService.getGroupData(groupName, token);
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

export const getGroupMovies = createAsyncThunk("groups/getMovies", async (groupName, thunkAPI) => {
  try{
      const token = thunkAPI.getState().auth.user.token;
      return await groupService.getGroupMovies(groupName, token);
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



export const groupSlice = createSlice({
    name: "group",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
      .addCase(createGroup.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.groups.push(action.payload)
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.payload
      }) 
      .addCase(joinGroup.pending, (state) => {
        state.isLoading = true
      })
      .addCase(joinGroup.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.groups.push(action.payload)
      })
      .addCase(joinGroup.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.payload
      }) 
      .addCase(getMyGroups.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMyGroups.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(getMyGroups.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(leaveGroup.pending, (state) => {
        state.isLoading = true
      })
      .addCase(leaveGroup.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.groups = state.groups.filter((group) => group._id !== action.payload.id)
      })
      .addCase(leaveGroup.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      }).addCase(kickUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(kickUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.groups = state.groups.filter((group) => group._id !== action.payload.id)
      })
      .addCase(kickUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      }).addCase(makeOwner.pending, (state) => {
        state.isLoading = true
      })
      .addCase(makeOwner.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(makeOwner.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      }).addCase(getGroupData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getGroupData.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(getGroupData.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAllGroups.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllGroups.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(getAllGroups.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getGroupMovies.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getGroupMovies.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(getGroupMovies.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
    }
})

export const {reset} = groupSlice.actions;
export default groupSlice.reducer;