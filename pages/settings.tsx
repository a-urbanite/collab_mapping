import { getAuth, updateProfile } from "firebase/auth";
import router from 'next/router';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { auth } from "../firebase-config";
import { signInUser } from '../reduxState/authenticationSlice';

const Settings = () => {

  const dispatch = useDispatch()
  const currentUser = useSelector((state: any) => state.currentUser)
  const [displayname, setdisplayname] = useState<string>(currentUser.name);
  // const [photoURL, setphotoURL] = useState<string>(auth.currentUser!.photoURL!);


const updateUserProfile = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault()
  await updateProfile(auth.currentUser!, {'displayName': displayname, 'photoURL': ""});
  dispatch(signInUser({
    name: displayname,
    email: auth.currentUser?.email,
    id: auth.currentUser?.uid
  }))
  router.push("/")
}
  
  return (
    <>
      <h1>Settings</h1>
      <p>Welcome {displayname}! Change your profile information here.</p>
      {/* <img src={auth.currentUser!.photoURL!} className="profilePic" alt='profilePic'></img> */}
      <form className='settingsForm' onSubmit={updateUserProfile}>
        <label htmlFor="displayname">User name:</label>
        <input id='displayname' onChange={(event) => {setdisplayname(event.target.value)}} defaultValue={displayname ? displayname : "currently no name assigned"}></input>
        {/* <label htmlFor="photoURL">photo URL:</label>
        <input id='photoURL' onChange={(event) => {setphotoURL(event.target.value)}} defaultValue={photoURL}></input> */}
        <label htmlFor="email">Email:</label>
        <input id='email' defaultValue={currentUser.email}/>
        <input type="submit" value="Go!"/>
      </form>
    </>
  )
}

export default Settings