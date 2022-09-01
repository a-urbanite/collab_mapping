import { createSlice, configureStore, current, createAsyncThunk } from '@reduxjs/toolkit'
import { auth } from "../firebase-config";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";

interface IUserObj {
  name: string | null | undefined
  email: string | null | undefined
  id: string | null | undefined
}

export const updateUser = createAsyncThunk('currentUser/updateUser',
  async (args: any, thunkAPI) => {
    // console.log("ARGS: ", args)
    await updateProfile(auth.currentUser!, {'displayName': args.name, 'photoURL': ""})
      .catch((e) => console.error(e))
    return args
  }
)

export const signInUser = createAsyncThunk('currentUser/signInUser',
  async (args: any, thunkAPI) => {
    const res = await signInWithEmailAndPassword(auth, args.logInEmail, args.logInPassword)
      .catch((e) => {
        console.error(e)
        throw new Error
      })
    const userObj = {
      name: res?.user.displayName,
      email: res?.user.email,
      id: res?.user.uid
    }
    return userObj
  }
)

export const authenticationSlice = createSlice({
  name: "currentUser",
  initialState: null as IUserObj | null,
  reducers: {
    signOutUser: (state) => {
      state = null
      return state
    }
  },
  extraReducers: (builder) => {
    builder
    //updateUser
    .addCase(updateUser.pending, (state, action) => {
      console.log("updateUser pending")
    })
    .addCase(updateUser.rejected, (state, action) => {
      console.log("updateUser rejected")
    })
    .addCase(updateUser.fulfilled, (state: any, action) => {
      console.log("updateUser fulfilled")
      state = action.payload
      return state
    })
    //SigninUser
    .addCase(signInUser.pending, (state, action) => {
      console.log("signInUser pending")
    })
    .addCase(signInUser.rejected, (state, action) => {
      console.log("signInUser rejected")
    })
    .addCase(signInUser.fulfilled, (state, action) => {
      console.log("signInUser fulfilled")
      // console.log("PAYLOAD", action.payload)
      state = action.payload
      return state
    })
  }

})

export const { signOutUser } = authenticationSlice.actions