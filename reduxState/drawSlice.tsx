import { createSlice, current, createAsyncThunk } from '@reduxjs/toolkit'

import { getFirestore, addDoc, collection } from 'firebase/firestore'
import { app, auth } from '../firebase-config'

const db = getFirestore(app);
const dbRef = collection(db, "features3");

// const drawingsCollectionRef = collection(db, "drawings" )

export const commitDrawnFeatures = createAsyncThunk('drawnFeatures/commitDrawnFeatures',
  async (drawnFeaturesArr: any, thunkAPI) => {

    console.log(drawnFeaturesArr)

    drawnFeaturesArr.forEach(async (feature: any) => {

      // console.log("feature to upload: ", feature)

      const geoJsonStr = JSON.stringify(feature)

      const res = await addDoc(dbRef, {feature: geoJsonStr})
        .then(docRef => {
            console.log("Document has been added successfully");
        })
        .catch(error => {
          console.log("error happened!")
            console.log(error);
        })
      
      console.log("RES: ", res)
    });

    return drawnFeaturesArr
  }
)

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
    deleteDrawnFeatures: (state: any) => {

      // console.log("deleteDrawnFeatures triggered")

      const emptyState: never[] = [];
      state = [...emptyState]

      // console.log("state after deleteAction", state)

      return state
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
    .addCase(commitDrawnFeatures.pending, (state, action) => {
      console.log("thunkReducer pending")
    })
    .addCase(commitDrawnFeatures.rejected, (state, action) => {
      console.log("thunkReducer rejected")
    })
    .addCase(commitDrawnFeatures.fulfilled, (state, action) => {
      console.log("thunkReducer fulfilled")
      // console.log("Document has been added successfully");
      console.log("state in extrareducer", current(state))
      console.log("action in extrareducer", action)
      // Add user to the state array
      // state.entities.push(action.payload)
    })
  },
})

export const { testing, addDrawnFeature, deleteDrawnFeatures } = drawSlice.actions