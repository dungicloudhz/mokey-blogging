// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyD4NJTsAiUd2D6jFwl2dmehY6cPkzSRZu0",
    authDomain: "monkey-blogging-a118f.firebaseapp.com",
    projectId: "monkey-blogging-a118f",
    storageBucket: "monkey-blogging-a118f.appspot.com",
    messagingSenderId: "1013510631279",
    appId: "1:1013510631279:web:c5376a9ab24a024fa2029a",
    measurementId: "G-56QFPJG3M3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
