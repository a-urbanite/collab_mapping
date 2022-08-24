import React, { useState } from 'react'
import router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from "../reduxState/store";
import { auth } from "../firebase-config";
import { updateUser } from "../reduxState/authenticationSlice";

const Settings = () => {
  const dispatch = useDispatch<AppDispatch>()
  const currentUser = useSelector((state: any) => state.currentUser)
  const [displayname, setdisplayname] = useState<string>(currentUser.name);
  const [email, setemail] = useState<string>(currentUser.email);
  // const [photoURL, setphotoURL] = useState<string>(auth.currentUser!.photoURL!);

  const updateUserProfile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(updateUser({
        name: displayname,
        email: email,
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
        <input id='email' onChange={(event) => {setemail(event.target.value)}} defaultValue={currentUser.email}/>
        <input type="submit" value="Go!"/>
      </form>
    </>
  )
}

export default Settings