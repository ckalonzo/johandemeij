import { ACTIONS } from 'redux/actions/types.js';
import { mainAction } from "redux/actions/index.actions";
import { db } from "../../firebase";
import { collection, getDocs, query, where, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import _ from "lodash";

const initialState = {};

export default function orderReducer(state = initialState, action) {
    switch (action.type) {
        case ACTIONS.CREATE_ORDER_LOCATION: {
            (async () => {
                try {
                    let stateCopy = _.cloneDeep(action.payload);
                    const docRef = await addDoc(collection(db, "orders"), stateCopy);
                    stateCopy._id = docRef.id;
                    action.asyncDispatch(mainAction(ACTIONS.CREATE_ORDER_LOCATION_SUCCESS, stateCopy));
                } catch (error) {
                    console.error("Error creating order location:", error);
                }
            })();
            return state;
        }

        case ACTIONS.CREATE_ORDER_LOCATION_SUCCESS: {
            return action.payload;
        }

        case ACTIONS.DELETE_ORDER_LOCATION: {
            (async () => {
                try {
                    const q = query(collection(db, "orders"), where("id", "==", action.payload));
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach(async (docSnap) => {
                        await deleteDoc(doc(db, "orders", docSnap.id));
                    });
                    action.asyncDispatch(mainAction(ACTIONS.DELETE_ORDER_LOCATION_SUCCESS, []));
                } catch (error) {
                    console.error("Error deleting order location:", error);
                }
            })();
            return state;
        }

        case ACTIONS.DELETE_ORDER_LOCATION_SUCCESS: {
            action.asyncDispatch(mainAction(ACTIONS.LOAD_ORDER_LOCATIONS, []));
            return state;
        }

        case ACTIONS.LOAD_ORDER_LOCATIONS: {
            (async () => {
                try {
                    const querySnapshot = await getDocs(collection(db, "orders"));
                    const data = querySnapshot.docs.map(docSnap => docSnap.data());
                    action.asyncDispatch(mainAction(ACTIONS.LOAD_ORDER_LOCATIONS_SUCCESS, data));
                } catch (error) {
                    console.error("Error loading order locations:", error);
                }
            })();
            return state;
        }

        case ACTIONS.LOAD_ORDER_LOCATIONS_SUCCESS: {
            return action.payload || state;
        }

        case ACTIONS.LOAD_ORDER_LOCATIONS_FAIL: {
            return state;
        }

        case ACTIONS.LOAD_ORDER_LOCATION: {
            (async () => {
                try {
                    const q = query(collection(db, "orders"), where("id", "==", action.payload));
                    const querySnapshot = await getDocs(q);
                    const data = querySnapshot.docs.map(docSnap => docSnap.data());
                    action.asyncDispatch(mainAction(ACTIONS.LOAD_ORDER_LOCATION_SUCCESS, ...data));
                } catch (error) {
                    console.error("Error loading order location:", error);
                }
            })();
            return state;
        }

        case ACTIONS.LOAD_ORDER_LOCATION_SUCCESS: {
            return action.payload || state;
        }

        case ACTIONS.LOAD_ORDER_LOCATION_FAIL: {
            return state;
        }

        case ACTIONS.UPDATE_ORDER_LOCATION: {
            (async () => {
                try {
                    let stateCopy = _.cloneDeep(action.payload);
                    const q = query(collection(db, "orders"), where("id", "==", stateCopy.id));
                    const querySnapshot = await getDocs(q);

                    if (!querySnapshot.empty) {
                        const docSnap = querySnapshot.docs[0];
                        await updateDoc(doc(db, "orders", docSnap.id), stateCopy);
                        action.asyncDispatch(mainAction(ACTIONS.UPDATE_ORDER_LOCATION_SUCCESS, stateCopy));
                    }
                } catch (error) {
                    console.error("Error updating order location:", error);
                }
            })();
            return state;
        }

        case ACTIONS.UPDATE_ORDER_LOCATION_SUCCESS: {
            return action.payload;
        }

        default:
            return state;
    }
}
