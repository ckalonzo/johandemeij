import { ACTIONS } from 'redux/actions/types.js';
import { mainAction } from "redux/actions/index.actions";
import { getFirestore, collection, doc, setDoc, query, where, getDocs, deleteDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "../../firebase"; // Ensure Firebase is initialized correctly
import { act } from 'react';

const initialState = {};

export default function presentationMusicReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.CREATE_PUBLICATION_MUSIC: {
      const stateCopy = action.payload;
      const file = {
        id: action.payload.id,
        musicName: action.payload.file.name,
        pres_id: action.payload.pres_id,
      };
      console.log(file);

      // Add a new document to the "presentationmusic" collection
      const presentationMusicRef = doc(collection(db, "presentationmusic"));
      setDoc(presentationMusicRef, file)
        .then(() => {
          action.asyncDispatch(mainAction(ACTIONS.CREATE_PUBLICATION_MUSIC_SUCCESS, action.payload));
        })
        .catch((error) => {
          console.error("Error creating publication music: ", error);
        });

      return state;
    }

    case ACTIONS.CREATE_PUBLICATION_MUSIC_SUCCESS: {
      const fileRef = ref(storage, `music/${action.payload.file.name}`);
      uploadBytes(fileRef, action.payload.file)
        .then((snapshot) => {
          console.log("File uploaded successfully");
          getDownloadURL(fileRef).then((url) => {
            console.log("Download URL: ", url);
            action.asyncDispatch(mainAction(ACTIONS.LOAD_PUBLICATION_MUSIC, action.payload.pres_id));
          });
        })
        .catch((error) => {
          console.error("Error uploading file: ", error);
        });

      return state;
    }

    case ACTIONS.CREATE_PUBLICATION_MUSIC_FAIL: {
      return state;
    }

    case ACTIONS.DELETE_PUBLICATION_MUSIC: {
      const q = query(collection(db, "presentationmusic"), where("id", "==", action.payload.ID));
      getDocs(q)
        .then((querySnapshot) => {
          querySnapshot.forEach((docSnapshot) => {
            deleteDoc(docSnapshot.ref)
              .then(() => {
                console.log("Document deleted successfully");
              })
              .catch((error) => {
                console.error("Error deleting document: ", error);
              });
          });
          action.asyncDispatch(mainAction(ACTIONS.DELETE_PUBLICATION_MUSIC_SUCCESS, action.payload));
        })
        .catch((error) => {
          console.error("Error fetching documents: ", error);
        });

      return state;
    }

    case ACTIONS.DELETE_PUBLICATION_MUSIC_SUCCESS: {
      const fileRef = ref(storage, `music/${action.payload.name}`);
      deleteObject(fileRef)
        .then(() => {
          console.log("File deleted successfully");
          action.asyncDispatch(mainAction(ACTIONS.LOAD_PUBLICATION_MUSIC, action.payload.ID));
        })
        .catch((error) => {
          console.error("Error deleting file: ", error);
        });

      return state;
    }

    case ACTIONS.DELETE_PUBLICATION_MUSIC_FAIL: {
      return state;
    }

    case ACTIONS.LOAD_PUBLICATION_MUSIC: {
      console.log("🚀 ~ .then ~ data:", action.payload)
      const q = query(collection(db, "presentationmusic"), where("pres_id", "==", action.payload));
      getDocs(q)
        .then((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => doc.data());
          console.log("🚀 ~ .then ~ data:", data)
          
          action.asyncDispatch(mainAction(ACTIONS.LOAD_PUBLICATION_MUSIC_SUCCESS, data));
        })
        .catch((error) => {
          console.error("Error loading publication music: ", error);
          action.asyncDispatch(mainAction(ACTIONS.LOAD_PUBLICATION_MUSIC_FAIL, action.payload));
        });

      return state;
    }

    case ACTIONS.LOAD_PUBLICATION_MUSIC_SUCCESS: {
      return action.payload;
    }

    case ACTIONS.LOAD_PUBLICATION_MUSIC_FAIL: {
      return state;
    }

    default:
      return {
        ...state,
      };
  }
}