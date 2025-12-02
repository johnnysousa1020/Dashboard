// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUZXkBACa4L1O0RSbzBAxPehPeiznmdRw",
  authDomain: "dashboard-filmes-82fd6.firebaseapp.com",
  projectId: "dashboard-filmes-82fd6",
  storageBucket: "dashboard-filmes-82fd6.firebasestorage.app",
  messagingSenderId: "518918849446",
  appId: "1:518918849446:web:3c236a3e17d56b2736c567"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)