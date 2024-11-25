import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBu97n84_33rgiDl_vZQjTBLLD8bB5ob_M",
  authDomain: "yakgwa-app.firebaseapp.com",
  projectId: "yakgwa-app",
  storageBucket: "yakgwa-app.firebasestorage.app",
  messagingSenderId: "484206657274",
  appId: "1:484206657274:web:bbb6cd2d1b58dea4241343",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
