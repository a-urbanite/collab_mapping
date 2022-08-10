import { createSlice, configureStore } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    incremented: (state: { value: number }) => {
      console.log("test")
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


const locationsSlice = createSlice({
  name: "locations",
  initialState: [],
  reducers: {
    getLocations: (state) => {
      return state
    },
    addLocations: (state: any, action: any) => {
      console.log("ADDLOCACTIONS TRIGGERED")
      console.log("action payload", action.payload)
      state = [...action.payload]
      console.log("state after update", state)
      return state
    }
  }
})

export const { getLocations, addLocations } = locationsSlice.actions

export const reduxstore = configureStore({
  reducer: { 
    counter: counterSlice.reducer,
    name: nameSlice.reducer,
    locations: locationsSlice.reducer
  }
})
