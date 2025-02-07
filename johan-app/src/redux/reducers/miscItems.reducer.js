import { mainAction } from "redux/actions/index.actions";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore"; // Firebase v9 imports

const initialState = {};

export default function miscItemsReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_MISC_ITEMS": {
            (async () => {
                try {
                    const querySnapshot = await getDocs(collection(db, "miscellaneousitems"));
                    const data = querySnapshot.docs.map(doc => doc.data());
                    action.asyncDispatch(mainAction("GET_MISC_ITEMS_SUCCESS", data));
                } catch (error) {
                    console.error("Error fetching miscellaneous items:", error);
                }
            })();
            return { title: "", content: "" };
        }

        case "GET_MISC_ITEMS_SUCCESS": {
            return action.payload[0] ? action.payload[0] : state;
        }

        default:
            return state;
    }
}
