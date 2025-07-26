// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "voting-system-34462.firebaseapp.com",
  projectId: "voting-system-34462",
  storageBucket: "voting-system-34462.firebasestorage.app",
  messagingSenderId: "937823118826",
  appId: "1:937823118826:web:419d0805ecf60de689fe93",
  measurementId: "G-X03SG9CQVS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);