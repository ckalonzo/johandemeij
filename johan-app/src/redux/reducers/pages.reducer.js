import { ACTIONS } from 'redux/actions/types.js';
import { mainAction } from "redux/actions/index.actions";
import { db } from "../../firebase";
import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore"; // Firebase v9 imports
import _ from "lodash";

const initialState = {};

export default function pageReducer(state = initialState, action) {
    switch (action.type) {
  
        case ACTIONS.LOAD_PAGE: {
            (async () => {
                try {
                    const pageQuery = query(collection(db, "pages"), where("id", "==", action.payload));
                    const snapshot = await getDocs(pageQuery);
                    const data = snapshot.docs.map(doc => doc.data());
                    action.asyncDispatch(mainAction(ACTIONS.LOAD_PAGE_SUCCESS, { ...data }));
                } catch (error) {
                    console.error("Error loading page:", error);
                }
            })();
            return state;
        }

        case ACTIONS.LOAD_PAGE_SUCCESS: {
            return action.payload[0];
        }

        case ACTIONS.LOAD_PAGES: {
            (async () => {
                try {
                    const pagesQuery = collection(db, "pages");
                    const snapshot = await getDocs(pagesQuery);
                    const data = snapshot.docs.map(doc => doc.data());
                    action.asyncDispatch(mainAction(ACTIONS.LOAD_PAGES_SUCCESS, { ...data }));
                } catch (error) {
                    console.error("Error loading pages:", error);
                }
            })();
            return state;
        }

        case ACTIONS.LOAD_PAGES_SUCCESS: {
            return action.payload;
        }

        case ACTIONS.UPDATE_PAGE: {
            (async () => {
                try {
                    const pageQuery = query(collection(db, "pages"), where("id", "==", action.payload.id));
                    const snapshot = await getDocs(pageQuery);

                    if (!snapshot.empty) {
                        const pageDoc = snapshot.docs[0]; // Get the first matching document
                        const pageRef = doc(db, "pages", pageDoc.id);

                        await updateDoc(pageRef, action.payload);
                        console.log("Update success");
                        action.asyncDispatch(mainAction(ACTIONS.UPDATE_PAGE_SUCCESS, action.payload));
                    }
                } catch (error) {
                    console.error("Error updating page:", error);
                }
            })();
            return state;
        }

        case ACTIONS.UPDATE_PAGE_SUCCESS: {
            return action.payload;
        }

        default:
            return { ...state };
    }
}
