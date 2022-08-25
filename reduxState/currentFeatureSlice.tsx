import { createSlice } from "@reduxjs/toolkit"

export const currentFeatureSlice = createSlice({
  name: "currentFeature",
  initialState: false,
  reducers: {
    activateLoader: (state) => {
      state = true
      return state
    },
    deactivateLoader: (state) => {
      state = false
      return state
    }
  }
})

export const { activateLoader, deactivateLoader } = currentFeatureSlice.actions