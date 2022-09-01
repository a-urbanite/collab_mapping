import { createSlice, configureStore, current, createAsyncThunk } from '@reduxjs/toolkit'
// import { collection, getDocs, getFirestore } from 'firebase/firestore';
// import { app } from '../firebase-config';

// const db = getFirestore(app);
// const dbRef = collection(db, "features3");

export const locationsSlice = createSlice({
  name: "locations",
  initialState: [],
  reducers: {
    getLocations: (state) => {
      return state
    },
    setLocations: (state: any, action: any) => {
      // console.log("ADDLOCACTIONS TRIGGERED")
      // console.log("action payload", action.payload)
      state = [...action.payload]
      // console.log("state after update", state)
      return state
    }
  }
})

export const { getLocations, setLocations } = locationsSlice.actions