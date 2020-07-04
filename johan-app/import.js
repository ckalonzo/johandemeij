// Imports
const firestoreService = require('firestore-export-import');
const firebaseConfig = require('./config');
const serviceAccount = require('./serviceAccount.json');

// JSON To Firestore
const jsonToFirestore = async () => {
  try {
    console.log('Initialzing Firebase');
    await firestoreService.initializeApp(serviceAccount, firebaseConfig.databaseURL);
    console.log('Firebase Initialized');



    await firestoreService.restore('/Users/carlkalonzo/Documents/DEV/johandemeij/johan-app/src/static/JSON/presentationmusic.json');
    console.log('Upload Success');
  }
  catch (error) {
    console.log(error);
  }
};

jsonToFirestore();