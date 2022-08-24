import { createSlice, configureStore, current, createAsyncThunk } from '@reduxjs/toolkit'
import { auth } from "../firebase-config";
import { updateProfile } from "firebase/auth";

export const updateUser = createAsyncThunk('currentUser/updateUser',
  async (args: any, thunkAPI) => {
    try {
      await updateProfile(auth.currentUser!, {'displayName': args.displayname, 'photoURL': ""});
    } catch (error) {
      console.error(error)
    }
    return args
  }
)

export const authenticationSlice = createSlice({
  name: "currentUser",
  initialState: null,
  reducers: {
    signInUser: (state, action) => {
      state = action.payload
      // console.log("state", state)
      return state
    },
    signOutUser: (state) => {
      state = null
      return state
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
    .addCase(updateUser.pending, (state, action) => {
      console.log("updateUser pending")
    })
    .addCase(updateUser.rejected, (state, action) => {
      console.log("updateUser rejected")
    })
    .addCase(updateUser.fulfilled, (state, action) => {
      console.log("updateUser fulfilled")
      // console.log("state in extrareducer", current(state))
      // console.log("action in extrareducer", action)
      state = action.payload
      return state
    })
  }
})

export const { signInUser, signOutUser } = authenticationSlice.actions