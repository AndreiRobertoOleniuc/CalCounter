import React, { useEffect } from "react";
import App from "../config/FirebaseConfig";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

const auth = getAuth(
  App(
    process.env.APIKEY,
    process.env.AUTHDOMAIN,
    process.env.PROJECTID,
    process.env.STORAGEBUCKET,
    process.env.MESSAGINGSENDERID,
    process.env.APPID
  )
);

function useAuth() {
  const [user, setUser] = React.useState<User>();

  useEffect(() => {
    const unsubscribeFromAuthStateChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user);
      } else {
        // User is signed out
        setUser(undefined);
      }
    });

    return unsubscribeFromAuthStateChanged;
  }, []);

  return {
    user,
  };
}

export { auth, useAuth };
