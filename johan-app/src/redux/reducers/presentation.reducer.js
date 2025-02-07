import { ACTIONS } from 'redux/actions/types.js';
import { mainAction } from "redux/actions/index.actions";
import { getFirestore, collection, addDoc, updateDoc, doc, getDocs, where, query, deleteDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject, uploadBytes, getDownloadURL } from "firebase/storage";
import _ from "lodash";

const db = getFirestore();
const storage = getStorage();
const initialState = {};

export default function presentationReducer(state = initialState, action) {
    switch (action.type) {
        case ACTIONS.LOAD_PRESENTATION: {
            let stateCopy = _.cloneDeep(state);
            let _id = '';
      
            // Create a query to fetch presentations with the specified ID
            const q = query(collection(db, "presentations"), where("id", "==", action.payload));
      
            // Execute the query
            getDocs(q)
              .then((querySnapshot) => {
                const data = querySnapshot.docs.map((doc) => {
                  // _id = doc.id; // Uncomment if you need the document ID
                  return doc.data();
                });
                stateCopy = data;
                // stateCopy[0]._id = _id; // Uncomment if you want to add the document ID to the data
                action.asyncDispatch(mainAction(ACTIONS.LOAD_PRESENTATION_SUCCESS, data));
              })
              .catch((error) => {
                console.error("Error loading presentation: ", error);
                action.asyncDispatch(mainAction(ACTIONS.LOAD_PRESENTATION_FAIL, error));
              });
      
            return state;
          }
      
          case ACTIONS.LOAD_PRESENTATION_SUCCESS: {
            // Return the first item in the payload array, or an empty array if no data is found
            return action.payload.length > 0 ? action.payload[0] : [];
          }
      
          case ACTIONS.LOAD_PRESENTATION_FAIL: {
            return state;
          }
        case ACTIONS.CREATE_NEW_CD: {
            let stateCopy = _.cloneDeep(action.payload);
            addDoc(collection(db, "cds"), stateCopy).then((docRef) => {
                stateCopy._id = docRef.id;
                updateDoc(doc(db, "cds", docRef.id), { _id: docRef.id }).then(() => {
                    action.asyncDispatch(mainAction(ACTIONS.CREATE_NEW_CD_SUCCESS, stateCopy));
                });
            });
            return action.payload;
        }
        case ACTIONS.DELETE_CD_IMAGE: {
            let image = {}, cd = {};
            if (action.payload.cover === "main") {
                image = {
                    albumID: action.payload.albumID,
                    cover: action.payload.cover || "",
                    imageName: action.payload.image.name
                };
            } else {
                image = {
                    albumID: action.payload.albumID,
                    caption: action.payload.caption || "",
                    cover: action.payload.cover || "",
                    imageName: action.payload.image.name
                };
            }
            cd = action.payload.cover === "frontCover" ? { frontCover: "", frontCaption: "" } : { backCover: "", backCaption: "" };
            updateDoc(doc(db, "cds", action.payload.docId), cd).then(() => {
                const q = query(collection(db, "cds"), where("id", "==", action.payload.ID), where("cover", "==", action.payload.imageType));
                getDocs(q).then((querySnapshot) => {
                    querySnapshot.forEach((docSnap) => deleteDoc(docSnap.ref));
                    action.asyncDispatch(mainAction(ACTIONS.DELETE_CD_IMAGE_SUCCESS, action.payload));
                });
            });
            return state;
        }
        case ACTIONS.DELETE_CD_IMAGE_SUCCESS: {
            const postImageRef = ref(storage, 'posts/' + action.payload.name);
            deleteObject(postImageRef).then(() => console.log("File deleted"));
            action.asyncDispatch(mainAction(ACTIONS.LOAD_PRESENTATION, action.payload.ID));
            return state;
        }
        case ACTIONS.LOAD_CD: {
            let stateCopy = _.cloneDeep(state);
            const q = query(collection(db, "cds"), where("id", "==", action.payload));
            getDocs(q).then((querySnapshot) => {
                const data = querySnapshot.docs.map(doc => ({ ...doc.data(), _id: doc.id }));
                if (data.length) {
                    stateCopy = data[0];
                    action.asyncDispatch(mainAction(ACTIONS.LOAD_CD_SUCCESS, stateCopy));
                }
            });
            return state;
        }
        case ACTIONS.UPDATE_CD: {
            updateDoc(doc(db, "cds", action.payload._id), action.payload).then(() => {
                action.asyncDispatch(mainAction(ACTIONS.UPDATE_CD_SUCCESS, action.payload));
            });
            return state;
        }
        case ACTIONS.UPLOAD_CD_IMAGE: {
            let image = {
                albumID: action.payload.albumID,
                caption: action.payload.caption || "",
                cover: action.payload.cover || "",
                imageName: action.payload.image.name
            };
            let cd = action.payload.cover === "frontCover" ? { frontCover: action.payload.image.name, frontCaption: action.payload.caption || "" } : { backCover: action.payload.image.name, backCaption: action.payload.caption || "" };
            updateDoc(doc(db, "cds", action.payload.docId), cd).then(() => {
                addDoc(collection(db, "postimages"), image).then(() => {
                    action.asyncDispatch(mainAction(ACTIONS.UPLOAD_CD_IMAGE_SUCCESS, action.payload));
                });
            });
            return state;
        }
        case ACTIONS.UPDATE_PUBLICATION: {
            (async () => {
              try {
                let stateCopy = _.cloneDeep(action.payload);
      
                const presentationsRef = collection(db, "presentations");
                const q = query(presentationsRef, where("id", "==", stateCopy.id));
                const querySnapshot = await getDocs(q);
      
                if (querySnapshot.empty) {
                  console.warn("No matching document found.");
                  return;
                }
      
                const docRef = querySnapshot.docs[0].ref;
                await updateDoc(docRef, stateCopy);
      
                action.asyncDispatch(mainAction(ACTIONS.UPDATE_PUBLICATION_SUCCESS, stateCopy));
              } catch (err) {
                console.error("Error updating publication:", err);
                action.asyncDispatch(mainAction(ACTIONS.UPDATE_PUBLICATION_FAIL, err.message));
              }
            })();
      
            return state;
          }
      
          case ACTIONS.UPDATE_PUBLICATION_SUCCESS: {
            action.asyncDispatch(mainAction(ACTIONS.LOAD_PRESENTATION, action.payload.id));
            window.location.reload(true);
            return {
              ...state,
              presentations: state.presentations.map(pres => 
                pres.id === action.payload.id ? { ...pres, ...action.payload } : pres
              )
            };
          }
      
          case ACTIONS.UPDATE_PUBLICATION_FAIL: {
            return state;
          }
        case ACTIONS.UPLOAD_CD_IMAGE_SUCCESS: {
            const path = action.payload.cover === "main" ? "music_catalogue/" : "posts/";
            const postImageRef = ref(storage, path + action.payload.image.name);
            uploadBytes(postImageRef, action.payload.image).then(() => {
                getDownloadURL(postImageRef).then((url) => {
                    console.log(url);
                    action.asyncDispatch(mainAction(ACTIONS.LOAD_PRESENTATION, action.payload.albumID));
                });
            });
            return state;
        }
        default:
            return { ...state };
    }
}
