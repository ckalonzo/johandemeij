import { ACTIONS } from 'redux/actions/types.js';
import { mainAction } from "redux/actions/index.actions";
import { updatePostImage, uploadPostImage, createPostImage } from "API/indexAPI";
import {  collection, doc, setDoc, query, where, getDocs, deleteDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "../../firebase"; // Ensure Firebase is initialized correctly
import _ from 'lodash';

const initialState = {
  currentID: ''
};

export default function singlePostReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.CREATE_NEW_POST_IMAGE: {
      createPostImage(action.payload)
        .then((json) => {
          action.asyncDispatch(mainAction(ACTIONS.CREATE_NEW_POST_IMAGE_SUCCESS, json));
        })
        .catch((err) => {
          action.asyncDispatch(mainAction(ACTIONS.CREATE_NEW_POST_IMAGE_FAIL, err));
        });
      return state;
    }

    case ACTIONS.CREATE_NEW_POST_IMAGE_SUCCESS: {
      let stateCopy = _.cloneDeep(state);
      action.asyncDispatch(mainAction(ACTIONS.LOAD_POST, stateCopy.ID));
      return state;
    }

    case ACTIONS.CREATE_NEW_POST_IMAGE_FAIL: {
      return state;
    }

    case ACTIONS.CREATE_NEW_POST: {
      let stateCopy = _.cloneDeep(action.payload);

      const postsRef = collection(db, "posts");
      setDoc(doc(postsRef), stateCopy)
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          stateCopy._id = docRef.id;
          action.asyncDispatch(mainAction(ACTIONS.CREATE_NEW_POST_SUCCESS, stateCopy));
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });

      return stateCopy;
    }

    case ACTIONS.CREATE_NEW_POST_SUCCESS: {
      return action.payload;
    }

    case ACTIONS.CREATE_NEW_POST_FAIL: {
      return state;
    }

    case ACTIONS.DELETE_POST: {
      const q = query(collection(db, "posts"), where("ID", "==", action.payload));
      getDocs(q)
        .then((querySnapshot) => {
          querySnapshot.forEach((docSnapshot) => {
            deleteDoc(docSnapshot.ref);
          });
          action.asyncDispatch(mainAction(ACTIONS.DELETE_POST_SUCCESS, []));
        })
        .catch((error) => {
          console.error("Error deleting document: ", error);
        });

      return state;
    }

    case ACTIONS.DELETE_POST_SUCCESS: {
      action.asyncDispatch(mainAction(ACTIONS.LOAD_DASHBOARD_POSTS, []));
      return state;
    }

    case ACTIONS.DELETE_POST_FAIL: {
      return action.payload;
    }

    case ACTIONS.DELETE_POST_IMAGE: {
      const q = query(collection(db, "postimages"), where("albumID", "==", action.payload.ID));
      getDocs(q)
        .then((querySnapshot) => {
          querySnapshot.forEach((docSnapshot) => {
            deleteDoc(docSnapshot.ref);
          });
          action.asyncDispatch(mainAction(ACTIONS.DELETE_POST_IMAGE_SUCCESS, action.payload));
        })
        .catch((error) => {
          console.error("Error deleting post image: ", error);
        });

      return state;
    }

    case ACTIONS.DELETE_POST_IMAGE_SUCCESS: {
      const fileRef = ref(storage, `images/posts/${action.payload.name}`);
      deleteObject(fileRef)
        .then(() => {
          console.log("File deleted successfully");
          action.asyncDispatch(mainAction(ACTIONS.LOAD_POST, action.payload.ID));
        })
        .catch((error) => {
          console.error("Error deleting file: ", error);
        });

      return state;
    }

    case ACTIONS.DELETE_POST_IMAGE_FAIL: {
      return action.payload;
    }

    case ACTIONS.LOAD_ARTICLE: {
      return action.payload;
    }

    case ACTIONS.LOAD_POST: {
      let post_id = '';

      const q = query(collection(db, "posts"), where("ID", "==", action.payload));
      getDocs(q)
        .then((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => {
            post_id = doc.id;
            return doc.data();
          });

          let stateCopy = _.cloneDeep(data);
          if (stateCopy[0]) stateCopy[0]._id = post_id;
          let _id = '';
          action.asyncDispatch(mainAction(ACTIONS.LOAD_POST_SUCCESS, stateCopy));

          // Load post images
          const imagesQ = query(collection(db, "postimages"), where("albumID", "==", action.payload));
          getDocs(imagesQ)
            .then((snapshotChanges) => {
              const imagesData = snapshotChanges.docs.map((doc) => {
                _id = doc.id;
                return doc.data();
              });

              stateCopy.forEach((post, i) => {
                stateCopy[i].image = imagesData;
              });

              if (snapshotChanges.size > 0) {
                action.asyncDispatch(mainAction(ACTIONS.LOAD_POST_SUCCESS, stateCopy));
              }
            })
            .catch((error) => {
              console.error("Error loading post images: ", error);
            });
        })
        .catch((error) => {
          console.error("Error loading post: ", error);
        });

      return state;
    }

    case ACTIONS.LOAD_POST_SUCCESS: {
      return { ...state, ...action.payload[0] };
    }

    case ACTIONS.LOAD_POST_FAIL: {
      return state;
    }

    case ACTIONS.UPDATE_POST: {
      const postRef = doc(db, "posts", action.payload._id);
      updateDoc(postRef, action.payload)
        .then(() => {
          action.asyncDispatch(mainAction(ACTIONS.UPDATE_POST_SUCCESS, action.payload));
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });

      return state;
    }

    case ACTIONS.UPDATE_POST_SUCCESS: {
      let stateCopy = _.cloneDeep(state);
      action.asyncDispatch(mainAction(ACTIONS.LOAD_POST, stateCopy.ID));
      return { ...state, ...action.payload };
    }

    case ACTIONS.UPDATE_POST_FAIL: {
      return state;
    }

    case ACTIONS.UPLOAD_IMAGE: {
      let stateCopy = _.cloneDeep(action.payload);
      let image = stateCopy.image;

      uploadPostImage(image)
        .then((json) => {
          if (json.status !== 404 && json.status !== 500) {
            action.asyncDispatch(mainAction(ACTIONS.UPLOAD_IMAGE_SUCCESS, { submitted: stateCopy, json }));
          } else {
            action.asyncDispatch(mainAction(ACTIONS.UPLOAD_IMAGE_FAIL, json.response.message));
          }
        })
        .catch((err) => action.asyncDispatch(mainAction(ACTIONS.UPLOAD_IMAGE_FAIL, err)));

      return state;
    }

    case ACTIONS.UPLOAD_IMAGE_SUCCESS: {
      let stateCopy = _.cloneDeep(state);

      let newImage = {
        _id: action.payload.submitted._id,
        albumID: action.payload.submitted.albumID,
        caption: action.payload.submitted.caption,
        cover: action.payload.submitted.cover,
        imageName: action.payload.json.data.filename,
        updatedAt: Date.now()
      };

      stateCopy.currentID = action.payload.submitted.albumID;
      action.asyncDispatch(mainAction(ACTIONS.UPDATE_POST_IMAGE, newImage));
      return stateCopy;
    }

    case ACTIONS.UPLOAD_IMAGE_FAIL: {
      return state;
    }

    case ACTIONS.UPDATE_POST_IMAGE: {
      updatePostImage(action.payload)
        .then((json) => {
          action.asyncDispatch(mainAction(ACTIONS.UPDATE_POST_IMAGE_SUCCESS, json));
        })
        .catch((err) => {
          action.asyncDispatch(mainAction(ACTIONS.UPDATE_POST_IMAGE_FAIL, err));
        });

      return state;
    }

    case ACTIONS.UPDATE_POST_IMAGE_SUCCESS: {
      let stateCopy = _.cloneDeep(state);
      action.asyncDispatch(mainAction(ACTIONS.LOAD_POST, stateCopy.ID));
      return state;
    }

    case ACTIONS.UPDATE_POST_IMAGE_FAIL: {
      return state;
    }

    case ACTIONS.UPLOAD_POST_IMAGE: {
      let image = {
        albumID: action.payload.albumID,
        caption: action.payload.caption ? action.payload.caption : "",
        cover: action.payload.cover,
        imageName: action.payload.image.name
      };

      const postImagesRef = collection(db, "postimages");
      setDoc(doc(postImagesRef), image)
        .then(() => {
          action.asyncDispatch(mainAction(ACTIONS.UPLOAD_POST_IMAGE_SUCCESS, action.payload));
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });

      return state;
    }

    case ACTIONS.UPLOAD_POST_IMAGE_SUCCESS: {
      const fileRef = ref(storage, `posts/${action.payload.image.name}`);
      uploadBytes(fileRef, action.payload.image)
        .then((snapshot) => {
          getDownloadURL(fileRef)
            .then((url) => {
              console.log("Download URL: ", url);
              action.asyncDispatch(mainAction(ACTIONS.LOAD_POST, action.payload.albumID));
            })
            .catch((error) => {
              console.error("Error getting download URL: ", error);
            });
        })
        .catch((error) => {
          console.error("Error uploading file: ", error);
        });

      return state;
    }

    case ACTIONS.UPLOAD_POST_IMAGE_FAIL: {
      return state;
    }

    default:
      return state;
  }
}