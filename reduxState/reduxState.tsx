import { createSlice, configureStore, current } from '@reduxjs/toolkit'

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
      // console.log("ADDLOCACTIONS TRIGGERED")
      // console.log("action payload", action.payload)
      state = [...action.payload]
      // console.log("state after update", state)
      return state
    }
  }
})

export const { getLocations, addLocations } = locationsSlice.actions

const authenticationSlice = createSlice({
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

const drawSlice = createSlice({
  name: "drawnFeatures",
  initialState: [],
  reducers: {
    testing: (state) => {
      console.log("TEST TRIGGERED")
      return state
    },
    addDrawnFeature: (state: any, action) => {

      console.log("STATE BEFORE UPDATE", current(state))
      // console.log("CURRENTFeature", action.payload)

      let duplicateIndex = state.findIndex((feature: any) => 
          feature.properties.drawingID === action.payload.properties.drawingID
        );

      console.log("DUPLETTE?: ", duplicateIndex)

      if (duplicateIndex !== -1) {
        const splicedArr = [...state]
        splicedArr.splice(duplicateIndex, 1, action.payload)
        state = [...splicedArr]
      } else {
        state = [...state, action.payload]
      }

      console.log("STATE AFTER UPDATE", state)

      return state
    }
  }
})

export const { testing, addDrawnFeature } = drawSlice.actions

export const reduxstore = configureStore({
  reducer: { 
    counter: counterSlice.reducer,
    name: nameSlice.reducer,
    locations: locationsSlice.reducer,
    currentUser: authenticationSlice.reducer,
    drawnFeatures: drawSlice.reducer
  }
})
