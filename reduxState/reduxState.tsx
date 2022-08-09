import { createSlice, configureStore } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    incremented: (state: { value: number }) => {
      state.value += 1
    },
    decremented: (state: { value: number }) => {
      state.value -= 1
    }
  }
})

export const { incremented, decremented } = counterSlice.actions

const nameSlice = createSlice({
  name: 'name',
  initialState: {
    value: "John Doe"
  },
  reducers: {
    replaceName: (state: { value: any }, action: { payload: any }) => {
      state.value = action.payload
      return state
    }
  }
})

export const { replaceName } = nameSlice.actions


// const locationsSlice = createSlice({
//   name: "locations",
//   initialState: starterSet,
//   reducers: {
//     getAllLocations
//   }
// })

export const counterstore = configureStore({
  reducer: { 
    counter: counterSlice.reducer,
    name: nameSlice.reducer  
  }
})
