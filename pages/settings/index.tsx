import React, { useEffect, useState } from 'react'
import router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from "../../reduxState/store";
import { auth } from "../../firebase-config";
import { updateUser } from "../../reduxState/authenticationSlice";
import styles from './Settings.module.css'

const Settings = () => {
  const dispatch = useDispatch<AppDispatch>()
  const currentUser = useSelector((state: any) => state.currentUser)
  console.log(currentUser)
  const [displayname, setdisplayname] = useState<string>(currentUser?.name);
  const [email, setemail] = useState<string>(currentUser?.email);
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

  useEffect(() => {
    console.log(displayname)
  }, [displayname])
  
  
  return (
    <div className={styles.SettingsWrapper}>
      <h1>Settings</h1>
      <p>Welcome {displayname}! Change your profile information here.</p>
      <br></br>
      {/* <img src={auth.currentUser!.photoURL!} className="profilePic" alt='profilePic'></img> */}
      <form className={styles.settingsForm} onSubmit={updateUserProfile}>
        <label htmlFor="displayname">User name:</label>
        <input 
          id='displayname' 
          className={styles.settingsForm__input}
          onChange={(event) => {setdisplayname(event.target.value)}} 
          defaultValue={displayname ? displayname : "currently no name assigned"}/>
        {/* <label htmlFor="photoURL">photo URL:</label>
        <input id='photoURL' onChange={(event) => {setphotoURL(event.target.value)}} defaultValue={photoURL}></input> */}
        <label htmlFor="email">Email:</label>
        <input 
          id='email' 
          className={styles.settingsForm__input}
          onChange={(event) => {setemail(event.target.value)}} 
          defaultValue={currentUser?.email}/>
        <input type="submit" value="Go!" className={styles.settingsForm__submit}/>
      </form>
    </div>
  )
}

export default Settings