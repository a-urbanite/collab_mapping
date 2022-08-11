import React, { useContext } from 'react'
import {auth, provider} from '../firebase-config'
import {signInWithPopup} from 'firebase/auth'
// import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile
} from "firebase/auth";
// import { auth } from "../../firebase/firebase-config";
// import styles from "../styles/pages/signin.module.css"
import { useRouter } from 'next/router';

// import { counterstore } from '../redux_state.js'
// import { authenticate } from '../redux_state';
import { useSelector, useDispatch } from 'react-redux'

import styles from '../styles/pages/login.module.css'
// import { authUserContext } from './_app';
import { signInUser } from '../reduxState/reduxState';

const Login = ({ setIsAuth }: any) => {

  // const count = useSelector((state: any) => state.isauth)
  const dispatch = useDispatch()
  
  const router = useRouter()
  // const contextData = useContext(authUserContext);
  // console.log(contextData)

  const [logInEmail, setlogInEmail] = useState<string>("");
  const [logInPassword, setlogInPassword] = useState<string>("");

  const signInWithEmail = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const result = await signInWithEmailAndPassword(auth, logInEmail, logInPassword)
    .catch(function(error) {
      console.log(error.code);
      console.log(error.message);
    });
    console.log("RETURN OF LOGIN OBJECT",typeof result!.user, result!.user)
    dispatch(signInUser())
    router.push('/')


    // const result = await signInWithEmailAndPassword(auth, logInEmail, logInPassword)
    //   .catch(function(error) {
    //     console.log(error.code);
    //     console.log(error.message);
    //   });
    // console.log("RETURN OF LOGIN OBJECT",typeof result!.user, result!.user)
    // if(result) {
    //     counterstore.dispatch(authenticate({
    //       name: result.user.displayName,
    //       email: result.user.email,
    //       uid: result.user.uid
    //     }))
    //     router.push('/')
    // }
  }

  // const signInWithGoogle = () => {
  //   signInWithPopup(auth, provider).then((result) => {
  //     localStorage.setItem("isAuth", `${true}`)
  //     setIsAuth(true);
  //     router.push('/')
  //   })
  // }


  return (
    <article className='page'>
      <h1>Sign in</h1>
      <form className={styles.loginForm} onSubmit={signInWithEmail}>
        {/* <h2>Sign in with Email</h2> */}
        <input 
          className={styles.loginForm__input}
          name='loginMail' 
          placeholder='Email...'
          onChange={(event) => {setlogInEmail(event.target.value)}}>
        </input>
        <input 
          className={styles.loginForm__input}
          type="password"
          name='loginPassword' 
          placeholder='password...'
          onChange={(event) => {setlogInPassword(event.target.value)}}>
        </input>
        {/* <button onClick={signInWithEmail}>Sign In with Email</button> */}
        <input 
          className={styles.loginForm__submit}
          type="submit" 
          autoFocus 
          value="Go!"/> 
      </form>
      {/* <p>Sign in with Google</p>
      <button className='login-with-google-btn' onClick={signInWithGoogle}>Sign in with Google</button> */}
      {/* <p>not registered yet? Signup</p>
      <button onClick={() => navigate('/signup')}>Sign up</button> */}
    </article>
  )
}

export default Login