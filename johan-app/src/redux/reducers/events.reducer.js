import { ACTIONS } from 'redux/actions/types.js';
import { mainAction } from "redux/actions/index.actions";

import { db } from "../../firebase"; // Import Firestore instance
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore"; // Import Firestore functions
import _ from 'lodash';

const initialState = {};

export default function eventsReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.LOAD_EVENTS: {
      // Query the "events" collection with a filter
      const eventsQuery = query(collection(db, "events"), where("id", "==", "53"));

      getDocs(eventsQuery)
        .then((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => doc.data());
          action.asyncDispatch(mainAction(ACTIONS.LOAD_EVENTS_SUCCESS, data));
        });

      return state;
    }

    case ACTIONS.LOAD_EVENTS_SUCCESS: {
      return action.payload;
    }

    case ACTIONS.LOAD_EVENTS_FAIL: {
      return state;
    }

    case ACTIONS.LOAD_EVENT: {
      // Query the "events" collection with a filter
      const eventQuery = query(collection(db, "events"), where("id", "==", "53"));

      getDocs(eventQuery)
        .then((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => doc.data());
          action.asyncDispatch(mainAction(ACTIONS.LOAD_EVENT_SUCCESS, data));
        });

      return state;
    }

    case ACTIONS.LOAD_EVENT_SUCCESS: {
      return action.payload;
    }

    case ACTIONS.LOAD_EVENT_FAIL: {
      return state;
    }

    case ACTIONS.UPDATE_EVENT: {
      // Reference the specific document to update
      const eventDocRef = doc(db, "events", "aa193720-9482-11ea-9b06-bd9ba17d908b");

      // Update the document
      updateDoc(eventDocRef, action.payload)
        .then(() => {
          action.asyncDispatch(mainAction(ACTIONS.UPDATE_EVENT_SUCCESS, action.payload));
        });

      return state;
    }

    case ACTIONS.UPDATE_EVENT_SUCCESS: {
      return state;
    }

    case ACTIONS.UPDATE_EVENT_FAIL: {
      return state;
    }

    default:
      return {
        ...state,
      };
  }
}