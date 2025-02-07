import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"
import { db, storage } from "../../firebase";
import { 
  collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc, query, where 
} from "firebase/firestore";  
import { ref, deleteObject, uploadBytes, getDownloadURL } from "firebase/storage";
import _ from "lodash";

const initialState = {};

export default function cdReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.CREATE_NEW_CD: {
      const createNewCD = async () => {
        try {
          let stateCopy = _.cloneDeep(action.payload);
          const docRef = await addDoc(collection(db, "cds"), stateCopy);
          stateCopy._id = docRef.id;
          await updateDoc(doc(db, "cds", docRef.id), { _id: docRef.id });
          action.asyncDispatch(mainAction(ACTIONS.CREATE_NEW_CD_SUCCESS, stateCopy));
        } catch (error) {
          console.error("Error creating CD:", error);
          action.asyncDispatch(mainAction(ACTIONS.CREATE_NEW_CD_FAIL, { error: "CD creation failed" }));
        }
      };
      createNewCD();
      return state;
    }

    case ACTIONS.DELETE_CD_IMAGE: {
      const deleteCDImage = async () => {
        try {
          const imageRef = doc(db, "cds", action.payload.docId);
          await updateDoc(imageRef, { [action.payload.cover]: "" });

          const querySnapshot = await getDocs(query(collection(db, "cds"), where("id", "==", action.payload.ID), where("cover", "==", action.payload.imageType)));
          querySnapshot.forEach(async (docSnap) => {
            await deleteDoc(docSnap.ref);
          });

          action.asyncDispatch(mainAction(ACTIONS.DELETE_CD_IMAGE_SUCCESS, action.payload));
        } catch (error) {
          console.error("Error deleting image:", error);
          action.asyncDispatch(mainAction(ACTIONS.DELETE_CD_IMAGE_FAIL, { error: "Image deletion failed" }));
        }
      };
      deleteCDImage();
      return state;
    }

    case ACTIONS.LOAD_CD: {
      const loadCD = async () => {
        try {
          const querySnapshot = await getDocs(query(collection(db, "cds"), where("id", "==", action.payload)));
          let cdData = [];
          let _id = "";
          querySnapshot.forEach((docSnap) => {
            _id = docSnap.id;
            cdData.push({ ...docSnap.data(), _id });
          });
          if (cdData.length > 0) {
            action.asyncDispatch(mainAction(ACTIONS.LOAD_CD_SUCCESS, cdData[0]));
          }
        } catch (error) {
          console.error("Error loading CD:", error);
          action.asyncDispatch(mainAction(ACTIONS.LOAD_CD_FAIL, { error: "CD loading failed" }));
        }
      };
      loadCD();
      return state;
    }

    case ACTIONS.UPDATE_CD: {
      const updateCD = async () => {
        try {
          const cdRef = doc(db, "cds", action.payload._id);
          await updateDoc(cdRef, action.payload);
          action.asyncDispatch(mainAction(ACTIONS.UPDATE_CD_SUCCESS, action.payload));
        } catch (error) {
          console.error("Error updating CD:", error);
          action.asyncDispatch(mainAction(ACTIONS.UPDATE_CD_FAIL, { error: "CD update failed" }));
        }
      };
      updateCD();
      return state;
    }

    case ACTIONS.UPLOAD_CD_IMAGE: {
      const uploadCDImage = async () => {
        try {
          const imageRef = ref(storage, `music_catalogue/${action.payload.image.name}`);
          await uploadBytes(imageRef, action.payload.image);

          const imageUrl = await getDownloadURL(imageRef);
          await updateDoc(doc(db, "cds", action.payload.docId), { cdImage: imageUrl });

          action.asyncDispatch(mainAction(ACTIONS.UPLOAD_CD_IMAGE_SUCCESS, action.payload));
        } catch (error) {
          console.error("Error uploading image:", error);
          action.asyncDispatch(mainAction(ACTIONS.UPLOAD_CD_IMAGE_FAIL, { error: "Image upload failed" }));
        }
      };
      uploadCDImage();
      return state;
    }

    default:
      return { ...state };
  }
}
