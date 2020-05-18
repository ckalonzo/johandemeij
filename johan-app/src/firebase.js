import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  // copy and paste your firebase credential here
  apiKey: "AIzaSyBGoFfAwHbNQ2byrWAK2rNnRn_qrjv5fdE",
  authDomain: "johandemeij-513b2.firebaseapp.com",
  databaseURL: "https://johandemeij-513b2.firebaseio.com",
  projectId: "johandemeij-513b2",
  storageBucket: "johandemeij-513b2.appspot.com",
  messagingSenderId: "973651910793",
  appId: "1:973651910793:web:9ff2680d5e135ed7db2658",
  measurementId: "G-HMQKVGGK5S"
});

const db = firebaseApp.firestore();


export {db};