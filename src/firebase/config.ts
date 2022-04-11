import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDyQKct2LxutOx3FRhMvSEzDIm7XTjnGSo",
  authDomain: "to-do-athmos.firebaseapp.com",
  projectId: "to-do-athmos",
  storageBucket: "to-do-athmos.appspot.com",
  messagingSenderId: "61766247881",
  appId: "1:61766247881:web:ea5de6f558dda2f4037418",
  measurementId: "G-ENY2169PS1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const FIRESTORE = getFirestore(app);
export const AUTH = getAuth(app);
