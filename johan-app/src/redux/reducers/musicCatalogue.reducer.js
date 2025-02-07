import { ACTIONS } from 'redux/actions/types.js';
import { mainAction } from "redux/actions/index.actions";
import { db } from "../../firebase";
import { collection, getDocs, query, where, orderBy, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import _ from "lodash";

const initialState = {};

export default function catalogueReducer(state = initialState, action) {
    switch (action.type) {
        case ACTIONS.LOAD_MUSIC_CATALOGUE: {
            (async () => {
                try {
                    const q = query(collection(db, "musicalbums"), orderBy("catalogueNumber", "asc"));
                    const querySnapshot = await getDocs(q);
                    const data = querySnapshot.docs.map(docSnap => docSnap.data());
                    action.asyncDispatch(mainAction(ACTIONS.LOAD_MUSIC_CATALOGUE_SUCCESS, data));
                } catch (error) {
                    console.error("Error loading music catalogue:", error);
                }
            })();
            return state;
        }

        case ACTIONS.LOAD_MUSIC_CATALOGUE_SUCCESS: {
            return action.payload;
        }

        case ACTIONS.LOAD_MUSIC_CATALOGUE_FAIL: {
            return state;
        }

        case ACTIONS.CREATE_CATALOGUE: {
            (async () => {
                try {
                    let stateCopy = _.cloneDeep(action.payload);
                    const docRef = await addDoc(collection(db, "musicalbums"), stateCopy);
                    stateCopy._id = docRef.id;
                    action.asyncDispatch(mainAction(ACTIONS.CREATE_CATALOGUE_SUCCESS, stateCopy));
                } catch (error) {
                    console.error("Error creating catalogue:", error);
                }
            })();
            return state;
        }

        case ACTIONS.CREATE_CATALOGUE_SUCCESS: {
            return action.payload;
        }

        case ACTIONS.DELETE_CATALOGUE: {
            (async () => {
                try {
                    const q = query(collection(db, "musicalbums"), where("id", "==", action.payload));
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach(async (docSnap) => {
                        await deleteDoc(doc(db, "musicalbums", docSnap.id));
                    });
                    action.asyncDispatch(mainAction(ACTIONS.DELETE_CATALOGUE_SUCCESS, []));
                } catch (error) {
                    console.error("Error deleting catalogue:", error);
                }
            })();
            return state;
        }

        case ACTIONS.DELETE_CATALOGUE_SUCCESS: {
            action.asyncDispatch(mainAction(ACTIONS.LOAD_MUSIC_CATALOGUE, []));
            return state;
        }

        case ACTIONS.DELETE_CATALOGUE_FAIL: {
            return state;
        }

        case ACTIONS.LOAD_CATALOGUE: {
            (async () => {
                try {
                    const q = query(collection(db, "musicalbums"), where("id", "==", action.payload));
                    const querySnapshot = await getDocs(q);
                    const data = querySnapshot.docs.map(docSnap => docSnap.data());
                    action.asyncDispatch(mainAction(ACTIONS.LOAD_CATALOGUE_SUCCESS, ...data));
                } catch (error) {
                    console.error("Error loading catalogue:", error);
                }
            })();
            return state;
        }

        case ACTIONS.LOAD_CATALOGUE_SUCCESS: {
            return action.payload || state;
        }

        case ACTIONS.LOAD_CATALOGUE_FAIL: {
            return state;
        }

        case ACTIONS.UPDATE_CATALOGUE: {
            (async () => {
                try {
                    let stateCopy = _.cloneDeep(action.payload);
                    const q = query(collection(db, "musicalbums"), where("id", "==", stateCopy.id));
                    const querySnapshot = await getDocs(q);

                    if (!querySnapshot.empty) {
                        const docSnap = querySnapshot.docs[0];
                        await updateDoc(doc(db, "musicalbums", docSnap.id), stateCopy);
                        action.asyncDispatch(mainAction(ACTIONS.UPDATE_CATALOGUE_SUCCESS, stateCopy));
                    }
                } catch (error) {
                    console.error("Error updating catalogue:", error);
                }
            })();
            return state;
        }

        case ACTIONS.UPDATE_CATALOGUE_SUCCESS: {
            return action.payload;
        }

        case ACTIONS.UPDATE_CATALOGUE_FAIL: {
            return state;
        }

        default:
            return {
                ...state
            };
    }
}
