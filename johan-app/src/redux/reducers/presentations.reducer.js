import { ACTIONS } from 'redux/actions/types.js';
import { mainAction } from "redux/actions/index.actions";
import { db } from "../../firebase"; 
import _ from "lodash";
import { getFirestore, collection, query, orderBy, getDocs, where, updateDoc, doc } from "firebase/firestore";

const initialState = {
  presentations: [],
  loading: false,
  error: null
};

export default function presentationsReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.LOAD_PRESENTATIONS: {
      (async () => {
        try {
          const presentationsRef = collection(db, "presentations");
          const q = query(presentationsRef, orderBy('cdName', 'asc'));
          const querySnapshot = await getDocs(q);

          const data = querySnapshot.docs.map(doc => doc.data());

          action.asyncDispatch(mainAction(ACTIONS.LOAD_PRESENTATIONS_SUCCESS, data));
        } catch (error) {
          console.error("Error fetching presentations:", error);
          action.asyncDispatch(mainAction(ACTIONS.LOAD_PRESENTATIONS_FAIL, error.message));
        }
      })();
      
      return {
        ...state,
        loading: true,
        error: null
      };
    }

    case ACTIONS.LOAD_PRESENTATIONS_SUCCESS: {
      return {
        ...state,
        presentations: action.payload,
        loading: false,
        error: null
      };
    }

    case ACTIONS.LOAD_PRESENTATIONS_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
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

    default:
      return state;
  }
}

export const loadPresentations = () => async (dispatch) => {
  dispatch({ type: ACTIONS.LOAD_PRESENTATIONS });

  try {
    const presentationsRef = collection(db, "presentations");
    const q = query(presentationsRef, orderBy('cdName', 'asc'));
    const querySnapshot = await getDocs(q);

    const data = querySnapshot.docs.map(doc => doc.data());

    dispatch(mainAction(ACTIONS.LOAD_PRESENTATIONS_SUCCESS, data));
  } catch (error) {
    dispatch(mainAction(ACTIONS.LOAD_PRESENTATIONS_FAIL, error.message));
  }
};
