// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export default function app(
  apikey: string,
  authDomain: string,
  projectId: string,
  storageBucket: string,
  messagingSenderId: string,
  appId: string
) {
  apikey = apikey.slice(0, -1);
  authDomain = authDomain.slice(0, -1);
  projectId = projectId.slice(0, -1);
  storageBucket = storageBucket.slice(0, -1);
  messagingSenderId = messagingSenderId.slice(0, -1);
  appId = appId.slice(0, -1);

  const firebaseConfig2 = {
    apiKey: apikey,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId,
  };

  return initializeApp(firebaseConfig2);
}
