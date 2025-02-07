import { ACTIONS } from 'redux/actions/types.js';
import { mainAction } from "redux/actions/index.actions";
import { db } from "../../firebase"; // Import Firestore instance
import { collection, query, where, orderBy, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore"; // Import Firestore functions
import _ from 'lodash';

const initialState = {};

export default function cdInfoReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.LOAD_CD_INFO: {
      let stateCopy = '';

      // Query the "cd_info" collection with filters and ordering
      const cdInfoQuery = query(
        collection(db, "cd_info"),
        where("cdId", "==", action.payload),
        orderBy("id", "asc")
      );

      getDocs(cdInfoQuery)
        .then((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => doc.data());
          stateCopy = data;

          // Query the "presentations" collection
          const presentationsQuery = query(collection(db, "presentations"));
          getDocs(presentationsQuery)
            .then((querySnapshot) => {
              const presentationsData = querySnapshot.docs.map((doc) => doc.data());

              // Map presentations data to cd_info data
              stateCopy.forEach((post, i) => {
                post.title = presentationsData
                  .filter((track) => track.id === stateCopy[i].track_title)
                  .map((title) => title.cdName);
                post.duration = presentationsData
                  .filter((track) => track.id === stateCopy[i].track_title)
                  .map((title) => title.totalTime);
                post.codes = presentationsData
                  .filter((track) => track.id === stateCopy[i].track_title)
                  .map((title) => title.codes);
              });

              // Dispatch success action with the mapped data
              action.asyncDispatch(mainAction(ACTIONS.LOAD_CD_INFO_SUCCESS, stateCopy));
            });
        });

      return state;
    }

    case ACTIONS.LOAD_CD_INFO_SUCCESS: {
      return action.payload;
    }

    case ACTIONS.LOAD_CD_INFO_FAIL: {
      return state;
    }

    case ACTIONS.UPDATE_CD_INFO: {
      let cd_id;

      // Query the "cd_info" collection to find the document to update
      const updateQuery = query(collection(db, "cd_info"), where("id", "==", action.payload.id));

      getDocs(updateQuery)
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            cd_id = doc.id;
          });

          // Update the document
          updateDoc(doc(db, "cd_info", cd_id), action.payload)
            .then(() => {
              action.asyncDispatch(mainAction(ACTIONS.UPDATE_CD_INFO_SUCCESS, action.payload));
            });
        });

      return state;
    }

    case ACTIONS.UPDATE_CD_INFO_SUCCESS: {
      action.asyncDispatch(mainAction(ACTIONS.LOAD_CD_INFO, action.payload.cdId));
      return state;
    }

    case ACTIONS.UPDATE_CD_INFO_FAIL: {
      return state;
    }

    case ACTIONS.CREATE_CD_INFO: {
      let stateCopy = _.cloneDeep(action.payload);

      // Add a new document to the "cd_info" collection
      addDoc(collection(db, "cd_info"), stateCopy)
        .then((docRef) => {
          stateCopy._id = docRef.id;

          // Update the document with the new _id field
          updateDoc(doc(db, "cd_info", docRef.id), { _id: docRef.id })
            .then(() => {
              action.asyncDispatch(mainAction(ACTIONS.CREATE_CD_INFO_SUCCESS, stateCopy));
            });
        });

      return state;
    }

    case ACTIONS.CREATE_CD_INFO_SUCCESS: {
      action.asyncDispatch(mainAction(ACTIONS.LOAD_CD_INFO, action.payload.cdId));
      return state;
    }

    case ACTIONS.CREATE_CD_INFO_FAIL: {
      return state;
    }

    case ACTIONS.DELETE_CD_INFO: {
      console.log(action);

      // Query the "cd_info" collection to find the document to delete
      const deleteQuery = query(collection(db, "cd_info"), where("id", "==", action.payload.id));

      getDocs(deleteQuery)
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            deleteDoc(doc.ref);
          });

          // Dispatch success action
          action.asyncDispatch(mainAction(ACTIONS.DELETE_POST_SUCCESS, action.payload.cdId));
        });

      return state;
    }

    case ACTIONS.DELETE_CD_INFO_SUCCESS: {
      action.asyncDispatch(mainAction(ACTIONS.LOAD_CD_INFO, action.payload));
      return state;
    }

    default:
      return {
        ...state,
      };
  }
}