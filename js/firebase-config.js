// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDbi98oItrlvn2B-O9q35EMDGgykCYe_mU",
    authDomain: "miyzaab-edu.firebaseapp.com",
    projectId: "miyzaab-edu",
    storageBucket: "miyzaab-edu.firebasestorage.app",
    messagingSenderId: "109152892611",
    appId: "1:109152892611:web:eac11f938e57a2b363ac8f",
    measurementId: "G-FJ9ZJBSKY2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
