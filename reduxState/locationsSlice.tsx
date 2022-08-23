import { createSlice, configureStore, current, createAsyncThunk } from '@reduxjs/toolkit'
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { app } from '../firebase-config';

const db = getFirestore(app);
const dbRef = collection(db, "features3");

export const fetchLocations = createAsyncThunk('drawnFeatures/commitDrawnFeatures',
  async ( args , thunkAPI) => {

    console.log("locationsThunk triggered")
    const dbRef = collection(db, "features3" )
    const locations = await getDocs(dbRef);
    console.log("locations: ", locations)
    return locations

  }
)


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