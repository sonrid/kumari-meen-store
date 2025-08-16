// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRhrx6bEerQ3YVpf4TbWSBEn77j7s-xh0",
  authDomain: "kumari-meen-auth-9a8e8.firebaseapp.com",
  projectId: "kumari-meen-auth-9a8e8",
  storageBucket: "kumari-meen-auth-9a8e8.firebasestorage.app",
  messagingSenderId: "1060149656363",
  appId: "1:1060149656363:web:8cac28926c289b4f37e36e",
  measurementId: "G-53GYPC4WH4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;
