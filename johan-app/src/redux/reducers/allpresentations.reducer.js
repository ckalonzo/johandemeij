import { ACTIONS } from 'redux/actions/types.js';
import { mainAction } from "redux/actions/index.actions";
import { db } from "../../firebase"; // Import Firestore instance
import { collection, getDocs } from "firebase/firestore"; // Import Firestore functions

const initialState = {};

export default function AllPresentationsReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.LOAD_ALL_PRESENTATIONS: {
      let stateCopy = '';

      // Reference the "presentations" collection
      const presentationsRef = collection(db, "presentations");

      // Fetch all documents from the "presentations" collection
      getDocs(presentationsRef)
        .then((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => doc.data());
          stateCopy = data;

          // Dispatch success action with the fetched data
          action.asyncDispatch(mainAction(ACTIONS.LOAD_ALL_PRESENTATIONS_SUCCESS, stateCopy));
        });

      return state;
    }

    case ACTIONS.LOAD_ALL_PRESENTATIONS_SUCCESS: {
      return action.payload;
    }

    case ACTIONS.LOAD_ALL_PRESENTATIONS_FAIL: {
      return state;
    }

    default:
      return {
        ...state,
      };
  }
}