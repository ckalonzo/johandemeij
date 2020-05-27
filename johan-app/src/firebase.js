import * as firebase from 'firebase'
import '@firebase/firestore'
import '@firebase/auth';
const firebaseApp = firebase.initializeApp({
  // copy and paste your firebase credential here
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: "https://johandemeij-513b2.firebaseio.com",
  projectId: "johandemeij-513b2",
  //storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  storageBucket: "johandemeij-513b2.appspot.com",
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
});
const storageRef = firebase.storage().ref();
const storage = firebase.storage()
const ref= firebase.database().ref("Uploads");
const db = firebaseApp.firestore();
export {db,storageRef,ref,storage};