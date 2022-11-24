import styles from "./MainNav.module.css";
import MenuPoint from "./MenuPoint";
import { useRouter } from "next/router";
import { AiFillSetting } from "react-icons/ai";
import { useUserContext } from "../../components/UserContext";

const MainNav = () => {
  const { isAuth, signOutUser } = useUserContext();
  const router = useRouter();

  return (
    <nav className={styles.mainNav}>
      <ul className={styles.list}>
        <MenuPoint href="/home">Home</MenuPoint>
        {isAuth && <MenuPoint href="/editMap">My Places</MenuPoint>}
        {!isAuth && <MenuPoint href="/login">Log in</MenuPoint>}
        {isAuth && <MenuPoint href="/editMap" func={() => {signOutUser()}}>Log out</MenuPoint> }
        {/* {authenticatedUser && <MenuPoint href="/settings"><AiFillSetting/></MenuPoint>} */}

        {isAuth && (
          <li className={styles.mainNav__link} onClick={() => router.push("/settings")}>
            <AiFillSetting />
          </li>
        )}
      </ul>
    </nav>
  );
};

export default MainNav;
