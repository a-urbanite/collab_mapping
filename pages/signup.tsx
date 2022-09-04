import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { auth } from '../firebase-config';
import styles from './login/login.module.css'

const SignUp = () => {
  const router = useRouter()

  const [signupEmail, setsignupEmail] = useState<string>("");
  const [signupPassword, setsignupPassword] = useState<string>("");

  const signupWithEmail = async () => {
    await createUserWithEmailAndPassword(auth, signupEmail as string, signupPassword as string)
      .catch(function(error) {
        console.log(error.code); 
        console.log(error.message);
      }).then((result) => {
            // localStorage.setItem("isAuth", `${true}`)
            // setIsAuth(true);
            router.push('/login')
          });

  }

  return (
    <div className={styles.loginWrapper}>
        <h1 className="title"> Sign up </h1>
        <input
          className={styles.loginForm__input}
          name="registerEmail"
          placeholder="Email..."
          onChange={(event) => {setsignupEmail(event.target.value)}}
        />
        <input
          className={styles.loginForm__input}
          type='password'
          name="registerPassword"
          placeholder="Password..."
          onChange={(event) => {setsignupPassword(event.target.value)}}
        />
        <button 
          className={styles.loginForm__submit}
          onClick={signupWithEmail}>Sign up with Email
        </button>
    </div>
  )
}

export default SignUp