import * as firebase from 'firebase'
import '@firebase/firestore'
import '@firebase/auth';

const config = {
  // copy and paste your firebase credential here
  apiKey: "AIzaSyBO0PF1ZdM8ZoPu2L1pYgSMyNdTMimNsdA",
  authDomain: "johandemeij-513b2.firebaseapp.com",
  databaseURL: "https://johandemeij-513b2.firebaseio.com",
  projectId: "johandemeij-513b2",
  storageBucket: "johandemeij-513b2.appspot.com",
  messagingSenderId: "973651910793",
  appId: "1:973651910793:web:9ff2680d5e135ed7db2658",
  measurementId: "G-HMQKVGGK5S"
}
const firebaseApp = firebase.initializeApp(config);
//=======================================================================

const storageRef = firebase.storage().ref();
const storage = firebase.storage()
const ref= firebase.database().ref("Uploads");

const database = firebaseApp.database()
const db = firebaseApp.firestore();


//=======================================================================
export {database,db,storageRef,storage};