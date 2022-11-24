import * as React from "react";
import { auth } from "../firebase-config";
import { useState } from "react";
// import { useState } from "react";
import { signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
// import { signOut } from 'firebase/auth';
import { useRouter } from "next/router";

const UserContext = React.createContext();

//context provider hook
const UserContextProvider = ({ children }) => {
  const router = useRouter();
  const [authenticatedUser, setauthenticatedUser] = useState();

  const signInUser = (logInEmail, logInPassword) => {
    signInWithEmailAndPassword(auth, logInEmail, logInPassword)
      .catch((e) => {
        console.error(e);
        throw new Error();
      })
      .then((res) => {
        setauthenticatedUser({
          name: res.user.displayName,
          email: res.user.email,
          id: res.user.uid,
        });
      });
  };

  const signOutUser = () => {
    signOut(auth)
      .catch((e) => {
        console.error(e);
        throw new Error();
      })
      .then(() => {
        setauthenticatedUser();
        router.push("/");
      });
  };

  const updateUser = async (name, email) => {
    updateProfile(auth.currentUser, { displayName: name, photoURL: "" })
      .catch((e) => {
        console.error(e);
        throw new Error();
      })
      .then((res) => {
        signOutUser()
        // console.log("res from updateUser", res);
        // setauthenticatedUser({
        //   name: res.user.displayName,
        //   email: res.user.email,
        //   id: res.user.uid,
        // });
      });
  };

  return (
    <UserContext.Provider value={{ authenticatedUser, signInUser, signOutUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

// context consumer hook
const useUserContext = () => React.useContext(UserContext);

export { UserContextProvider, useUserContext };
