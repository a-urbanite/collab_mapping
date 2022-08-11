import Link from 'next/link'
import styles from './MainNav.module.css'
import { useRouter } from 'next/router';
import MenuPoint from './MenuPoint';
// import {signOut} from 'firebase/auth'
// import { auth } from '../firebase-config';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { signOutUser } from '../../reduxState/reduxState';


const MainNav = () => {

  const router = useRouter()
  const dispatch = useDispatch()

  const isAuth = useSelector((state: any) => state.authentication)
  console.log("ISAUTH", isAuth)
  // const isAuth = useSelector( (state: any) => state.authState.isauth)
  // console.log("authstate from withing mainnav", isAuth)

  const signUserOut = () => {
    signOut(auth).then(() => {
        // localStorage.clear()
        // setIsAuth(false)
        // window.location.pathname = "/login"
        dispatch(signOutUser())
        router.push("/login")
    })
  }

    return (
      <nav className={styles.mainNav}>
          <ul className={styles.list}>
              <MenuPoint name="Home" href="/" className={styles.mainNav__link}/>
              { isAuth && <MenuPoint name="Edit Map" href="/editMap" className={styles.mainNav__link}/>}
              { !isAuth && <MenuPoint name="Log in" href="/login" className={styles.mainNav__link}/>}
              { !isAuth && <MenuPoint name="Sign Up" href="/signup" className={styles.mainNav__link}/>}
              { isAuth && <li><button onClick={() => signUserOut()}>Log Out</button></li>}

          </ul>
      </nav>
    );
}

export default MainNav;