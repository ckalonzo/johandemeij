import { ACTIONS } from 'redux/actions/types.js';
import { mainAction } from "redux/actions/index.actions";
import { db } from "../../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const initialState = {};

export default function cdsReducer(state = initialState, action) {
    switch (action.type) {
        case ACTIONS.LOAD_CDS: {
            (async () => {
                try {
                    const q = query(collection(db, "cds"), orderBy("cd_name", "asc"));
                    const querySnapshot = await getDocs(q);
                    const data = querySnapshot.docs.map(doc => doc.data());
                    action.asyncDispatch(mainAction(ACTIONS.LOAD_CDS_SUCCESS, data));
                } catch (error) {
                    console.error("Error loading CDs:", error);
                    action.asyncDispatch(mainAction(ACTIONS.LOAD_CDS_FAIL, { error }));
                }
            })();
            return state;
        }

        case ACTIONS.LOAD_CDS_SUCCESS: {
            return action.payload;
        }

        case ACTIONS.LOAD_CDS_FAIL: {
            return state;
        }

        default:
            return { ...state };
    }
}
