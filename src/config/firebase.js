// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREABASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREABASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREABASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREABASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREABASE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FIREABASE_APPID,
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
