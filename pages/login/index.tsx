import {auth} from '../../firebase-config'
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux'
import styles from './login.module.css'
import { signInUser } from '../../reduxState/authenticationSlice';
import { AppDispatch } from '../../reduxState/store';

const Login = () => {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const [logInEmail, setlogInEmail] = useState<string>("");
  const [logInPassword, setlogInPassword] = useState<string>("");

  const signInWithEmail = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(signInUser({logInEmail, logInPassword}))
    router.push('/')
  }

  return (
    <div className={styles.loginWrapper}>
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
      <p>not registered yet?</p>
      <button className={styles.loginForm__submit} onClick={() => router.push('/signup')}>Sign up!</button>
    </div>
  )
}

export default Login