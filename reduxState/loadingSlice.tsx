import { createSlice } from "@reduxjs/toolkit"


export const loadingSlice = createSlice({
  name: "isLoading",
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

export const { activateLoader, deactivateLoader } = loadingSlice.actions