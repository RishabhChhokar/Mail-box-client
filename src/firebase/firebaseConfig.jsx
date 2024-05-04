import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBW667VYqKhnmvuSiUVDTGGlNQMVYDHT0",
  authDomain: "react-authentication--app.firebaseapp.com",
  databaseURL: "https://react-authentication--app-default-rtdb.firebaseio.com",
  projectId: "react-authentication--app",
  storageBucket: "react-authentication--app.appspot.com",
  messagingSenderId: "855222330187",
  appId: "1:855222330187:web:9b19feb9c270696ea3fece",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
