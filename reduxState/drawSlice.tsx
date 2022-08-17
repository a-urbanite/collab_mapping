import { createSlice, configureStore, current } from '@reduxjs/toolkit'

export const drawSlice = createSlice({
  name: "drawnFeatures",
  initialState: [],
  reducers: {
    testing: (state) => {
      console.log("TEST TRIGGERED")
      return state
    },
    addDrawnFeature: (state: any, action) => {

      // console.log("STATE BEFORE UPDATE", current(state))
      // console.log("CURRENTFeature", action.payload)

      let duplicateIndex = state.findIndex((feature: any) => 
          feature.properties.drawingID === action.payload.properties.drawingID
        );

      // console.log("DUPLETTE?: ", duplicateIndex)

      if (duplicateIndex !== -1) {
        const splicedArr = [...state]
        splicedArr.splice(duplicateIndex, 1, action.payload)
        state = [...splicedArr]
      } else {
        state = [...state, action.payload]
      }

      // console.log("STATE AFTER UPDATE", state)

      return state
    },
    uploadDrawnFeatures: (state: any) => {

    }
  }
})

export const { testing, addDrawnFeature } = drawSlice.actions