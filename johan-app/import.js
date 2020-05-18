// Imports
const firestoreService = require('firestore-export-import');
const firebaseConfig = require('./config');
const serviceAccount = require('./serviceAccount.json');

// JSON To Firestore
// const jsonToFirestore = async () => {
//   try {
//     console.log('Initialzing Firebase');
//     await firestoreService.initializeApp(serviceAccount, firebaseConfig.databaseURL);
//     console.log('Firebase Initialized');

//     await firestoreService.restore('/Applications/MAMP/htdocs/websites/johan-de-meij/johan-app/src/static/JSON/musicalbums.json');
//     console.log('Upload Success');
//   }
//   catch (error) {
//     console.log(error);
//   }
// };

// jsonToFirestore();

// Create a root reference
var storageRef = firebase.storage().ref();

// Create a reference to 'mountains.jpg'
var mountainsRef = storageRef.child('/Applications/MAMP/htdocs/websites/johan-de-meij/johan-app/public/images/bio_pic.jpg');

// Create a reference to 'images/mountains.jpg'
var mountainImagesRef = storageRef.child('images/bio_pic.jpg');