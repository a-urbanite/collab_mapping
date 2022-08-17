import { configureStore } from '@reduxjs/toolkit'
import { locationsSlice } from './locationsSlice'
import { authenticationSlice } from './authenticationSlice'
import { drawSlice } from './drawSlice'

export const reduxstore = configureStore({
  reducer: { 
    locations: locationsSlice.reducer,
    currentUser: authenticationSlice.reducer,
    drawnFeatures: drawSlice.reducer
  }
})
