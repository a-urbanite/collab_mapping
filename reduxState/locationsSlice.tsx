import { createSlice, configureStore, current } from '@reduxjs/toolkit'

export const locationsSlice = createSlice({
  name: "locations",
  initialState: [],
  reducers: {
    getLocations: (state) => {
      return state
    },
    addLocations: (state: any, action: any) => {
      // console.log("ADDLOCACTIONS TRIGGERED")
      // console.log("action payload", action.payload)
      state = [...action.payload]
      // console.log("state after update", state)
      return state
    }
  }
})

export const { getLocations, addLocations } = locationsSlice.actions