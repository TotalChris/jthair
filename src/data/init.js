// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// using import.meta.env

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FB_API_KEY,
    authDomain: import.meta.env.VITE_FB_PROJECT_NAME + ".firebaseapp.com",
    projectId: import.meta.env.VITE_FB_PROJECT_NAME,
    storageBucket: import.meta.env.VITE_FB_PROJECT_NAME  + ".appspot.com",
    messagingSenderId: import.meta.env.VITE_FB_CLIENT_ID,
    appId: import.meta.env.VITE_FB_MESSAGING_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)