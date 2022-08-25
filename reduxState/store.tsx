import { configureStore } from '@reduxjs/toolkit'
import { locationsSlice } from './locationsSlice'
import { authenticationSlice } from './authenticationSlice'
import { drawSlice } from './drawSlice'
import { loadingSlice } from './loadingSlice'

export const reduxstore = configureStore({
  reducer: { 
    locations: locationsSlice.reducer,
    currentUser: authenticationSlice.reducer,
    drawnFeatures: drawSlice.reducer,
    isLoading: loadingSlice.reducer
  }
})

export type AppDispatch = typeof reduxstore.dispatch
