// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore"; // Add `collection`
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBO0PF1ZdM8ZoPu2L1pYgSMyNdTMimNsdA",
  authDomain: "johandemeij-513b2.firebaseapp.com",
  databaseURL: "https://johandemeij-513b2.firebaseio.com",
  projectId: "johandemeij-513b2",
  storageBucket: "johandemeij-513b2.appspot.com",
  messagingSenderId: "973651910793",
  appId: "1:973651910793:web:9ff2680d5e135ed7db2658",
  measurementId: "G-HMQKVGGK5S",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp); // Firestore instance
const storage = getStorage(firebaseApp);
const database = getDatabase(firebaseApp);

// Export the services you want to use in your app
export { database, db, storage, auth, collection }; // Export `collection`