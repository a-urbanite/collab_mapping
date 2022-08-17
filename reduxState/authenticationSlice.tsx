import { createSlice, configureStore, current } from '@reduxjs/toolkit'

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
  }
})

export const { signInUser, signOutUser } = authenticationSlice.actions