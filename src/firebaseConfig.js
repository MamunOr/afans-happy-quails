// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDsTLYMlhY8NQwiyK2U0Hvr4aF-1c-nY5k",
  authDomain: "quail-farm-app-next.firebaseapp.com",
  projectId: "quail-farm-app-next",
  storageBucket: "quail-farm-app-next.firebasestorage.app",
  messagingSenderId: "392914428761",
  appId: "1:392914428761:web:6e70287b51e296811ae248",
  measurementId: "G-MXR31DGXEH"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
