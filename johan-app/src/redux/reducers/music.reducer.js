import { ACTIONS } from 'redux/actions/types.js';
import { mainAction } from "redux/actions/index.actions";
import { db } from "../../firebase";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore"; // Firebase v9 modular imports
import _ from 'lodash';

const initialState = {
    categories: [
        { id: 1, name: "Compositions" },
        { id: 2, name: "Amstel Classics" },
        { id: 3, name: "Music for the Theatre" },
        { id: 4, name: "Symphony Orchestra" },
        { id: 5, name: "The Music of S&oslash;ren Hyldgaard" },
        { id: 6, name: "Solo Concertos" },
        { id: 9, name: "Cd's" },
        { id: 0, name: "All music" },
    ],
    allPresentations: []
};

export default function musicReducer(state = initialState, action) {
    switch (action.type) {

        case ACTIONS.LOAD_MUSIC: {
            (async () => {
                try {
                    const musicQuery = query(collection(db, "presentations"), orderBy('cdName', 'asc'));
                    const querySnapshot = await getDocs(musicQuery);
                    const data = querySnapshot.docs.map(doc => doc.data());
                    action.asyncDispatch(mainAction(ACTIONS.LOAD_MUSIC_SUCCESS, data));
                } catch (error) {
                    action.asyncDispatch(mainAction(ACTIONS.LOAD_MUSIC_FAIL, error.message));
                }
            })();
            return state;
        }

        case ACTIONS.LOAD_MUSIC_SUCCESS: {
            let stateCopy = _.cloneDeep(state);
            stateCopy.allPresentations = action.payload;
            return stateCopy;
        }

        case ACTIONS.LOAD_MUSIC_FAIL: {
            return state;
        }

        case ACTIONS.LOAD_MUSIC_BY_CATEGORY: {
            (async () => {
                try {
                    const categoryQuery = query(
                        collection(db, "presentations"),
                        where("category", "==", action.payload.toString()),
                        orderBy('cdName', 'asc')
                    );
                    const querySnapshot = await getDocs(categoryQuery);
                    const data = querySnapshot.docs.map(doc => doc.data());
                    action.asyncDispatch(mainAction(ACTIONS.LOAD_MUSIC_SUCCESS, data));
                } catch (error) {
                    action.asyncDispatch(mainAction(ACTIONS.LOAD_MUSIC_FAIL, error.message));
                }
            })();
            return state;
        }

        case ACTIONS.LOAD_MUSIC_BY_CATEGORY_SUCCESS: {
            let stateCopy = _.cloneDeep(state);
            stateCopy.allPresentations = action.payload;
            return stateCopy;
        }

        default:
            return { ...state };
    }
}
