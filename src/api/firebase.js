import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBnTyvmzJT4drKRakDGaOGCCn9QXyAYS4g",
    authDomain: "apppemesanan-5fafc.firebaseapp.com",
    projectId: "apppemesanan-5fafc",
    storageBucket: "apppemesanan-5fafc.appspot.com", // Perbaikan domain
    messagingSenderId: "149536472438",
    appId: "1:149536472438:web:61cf8b764efbc1a5bb8e57",
    measurementId: "G-Z9VNM2YLT3"
};

// Inisialisasi Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // Instance Firestore
