import React, { useEffect, useState } from 'react'
import router from 'next/router';
import styles from './Settings.module.css'
import { useUserContext } from "../../components/UserContext";

const Settings = () => {
  const { authenticatedUser, updateUser } = useUserContext();

  const [displayname, setdisplayname] = useState<string>(authenticatedUser?.name);
  const [email, setemail] = useState<string>(authenticatedUser?.email);
  // const [photoURL, setphotoURL] = useState<string>(auth.currentUser!.photoURL!);

  const updateUserProfile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    updateUser(displayname, email)
    router.push("/")
  }
  
  
  return (
    <div className={styles.SettingsWrapper}>
      <h1>Settings</h1>
      <p>Welcome {authenticatedUser.name}! Change your profile information here.</p>
      <br></br>
      {/* <img src={auth.currentUser?.photoURL?} className="profilePic" alt='profilePic'></img> */}
      <form className={styles.settingsForm} onSubmit={updateUserProfile}>
        <label htmlFor="displayname">User name:</label>
        <input 
          id='displayname' 
          className={styles.settingsForm__input}
          onChange={(event) => {setdisplayname(event.target.value)}} 
          defaultValue={authenticatedUser.name}/>
        {/* <label htmlFor="photoURL">photo URL:</label>
        <input id='photoURL' onChange={(event) => {setphotoURL(event.target.value)}} defaultValue={photoURL}></input> */}
        <label htmlFor="email">Email:</label>
        <input 
          readOnly
          id='email' 
          className={styles.settingsForm__input}
          onChange={(event) => {setemail(event.target.value)}} 
          defaultValue={authenticatedUser?.email}/>
        <input type="submit" value="Go!" className={styles.settingsForm__submit}/>
      </form>
    </div>
  )
}

export default Settings