// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDqaMW1cPAaAVHdMMyUOn3RnOFz_V1lKeo",
  authDomain: "mensa-app-v2.firebaseapp.com",
  projectId: "mensa-app-v2",
  storageBucket: "mensa-app-v2.firebasestorage.app",
  messagingSenderId: "480500280982",
  appId: "1:480500280982:web:69d60afb2c741f59fedcb7",
  // measurementId ist nicht nötig für React Native
};

const app = initializeApp(firebaseConfig);

// Wichtige Exporte für Login & Datenbank
export const auth = getAuth(app);
export const db = getFirestore(app);
