import { firebase } from '@firebase/app';
import '@firebase/firestore'
import '@firebase/auth';
const firebaseApp = firebase.initializeApp({
  // copy and paste your firebase credential here
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: "johandemeij-513b2",
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
});

const db = firebaseApp.firestore();
export {db};