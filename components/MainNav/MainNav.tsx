import styles from './MainNav.module.css'
import MenuPoint from './MenuPoint';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { signOutUser } from '../../reduxState/authenticationSlice';
import { AiFillSetting } from "react-icons/ai";


const MainNav = () => {

  const router = useRouter()
  const dispatch = useDispatch()
  const isAuth = useSelector((state: any) => state.currentUser)
  // console.log("ISAUTH", isAuth)


  const signUserOut = () => {
    signOut(auth).then(() => {
        // localStorage.clear()
        // setIsAuth(false)
        // window.location.pathname = "/login"
        dispatch(signOutUser())
        router.push("/")
    })
  }

    return (
      <nav className={styles.mainNav}>
          <ul className={styles.list}>
              <MenuPoint name="Home" href="/home" className={styles.mainNav__link}/>
              { isAuth && <MenuPoint name="My places" href="/editMap" className={styles.mainNav__link}/>}
              { !isAuth && <MenuPoint name="Log in" href="/login" className={styles.mainNav__link}/>}
              { isAuth && <li className={styles.mainNav__link} onClick={() => signUserOut()}>Log out</li>}
              { isAuth && <li className={styles.mainNav__link} onClick={() => router.push("/settings")}><AiFillSetting/></li>}
          </ul>
      </nav>
    );
}

export default MainNav;