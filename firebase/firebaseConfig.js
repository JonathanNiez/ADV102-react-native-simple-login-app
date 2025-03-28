// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA19BCPf8JjvVgJ6sGysry-y3tfBdqeUkQ",
  authDomain: "adv102-e3eee.firebaseapp.com",
  projectId: "adv102-e3eee",
  storageBucket: "adv102-e3eee.firebasestorage.app",
  messagingSenderId: "201636347083",
  appId: "1:201636347083:web:4d99b51ed534a3a97eef4e",
  measurementId: "G-P9X7KW7YXL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
