import styles from './MainNav.module.css'
import MenuPoint from './MenuPoint';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { signOutUser } from '../../reduxState/authenticationSlice';


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
              <MenuPoint name="Home" href="/" className={styles.mainNav__link}/>
              { isAuth && <MenuPoint name="Edit Map" href="/editMap" className={styles.mainNav__link}/>}
              { !isAuth && <MenuPoint name="Log in" href="/login" className={styles.mainNav__link}/>}
              { isAuth && <li className={styles.mainNav__link} onClick={() => signUserOut()}>Log out</li>}

          </ul>
      </nav>
    );
}

export default MainNav;