import Link from 'next/link'
import styles from './MainNav.module.css'
import { useRouter } from 'next/router';
import MenuPoint from './MenuPoint';
// import {signOut} from 'firebase/auth'
// import { auth } from '../firebase-config';


const MainNav = () => {

  const router = useRouter()
  // const isAuth = useSelector( (state: any) => state.authState.isauth)
  // console.log("authstate from withing mainnav", isAuth)

  // const signUserOut = () => {
  //   signOut(auth).then(() => {
  //       // localStorage.clear()
  //       // setIsAuth(false)
  //       // window.location.pathname = "/login"
  //       router.push("/login")
  //   })
  // }

    return (
      <nav className={styles.mainNav}>
          <ul className={styles.list}>
              <MenuPoint name="Home" href="/" className={styles.mainNav__link}/>
              <MenuPoint name="Edit Map" href="/editMap" className={styles.mainNav__link}/>

              {/* { !isAuth && <li className={styles.mainNav__link}>
                <Link href='/signin'>{isAuth? "Log out" : "Log in"}</Link>
              </li> }
              { isAuth && <li>INSIDE!</li>}
              <li className={styles.mainNav__link}>
                <Link href='/redux-test'>redux-test</Link>
              </li>
              
              { isAuth && <button className={styles.mainNav__link}onClick={signUserOut}>Log Out</button>} */}
              
          </ul>
      </nav>
    );
}

export default MainNav;