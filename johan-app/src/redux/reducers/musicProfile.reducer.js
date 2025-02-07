import { ACTIONS } from 'redux/actions/types.js';
import { mainAction } from "redux/actions/index.actions";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import _ from "lodash";

const initialState = {};

export default function musicProfileReducer(state = initialState, action) {
    switch (action.type) {
        case ACTIONS.LOAD_MUSIC_PROFILE: {
            (async () => {
                try {
                    const presentationsRef = collection(db, "presentations");
                    const q = query(presentationsRef, where("id", "==", action.payload));
                    const querySnapshot = await getDocs(q);

                    if (querySnapshot.empty) {
                        console.warn("No matching presentations found.");
                        return;
                    }

                    const mainData = querySnapshot.docs[0].data();

                    const musicRef = collection(db, "presentationmusic");
                    const musicQuery = query(musicRef, where("pres_id", "==", mainData.id));
                    const musicSnapshot = await getDocs(musicQuery);

                    mainData.music = musicSnapshot.docs.map(doc => doc.data());

                    action.asyncDispatch(mainAction(ACTIONS.LOAD_MUSIC_PROFILE_SUCCESS, mainData));
                } catch (err) {
                    console.error("Error loading music profile:", err);
                    action.asyncDispatch(mainAction(ACTIONS.LOAD_MUSIC_PROFILE_FAIL, err));
                }
            })();
            return state;
        }

        case ACTIONS.LOAD_MUSIC_PROFILE_BY_ID: {
            (async () => {
                try {
                    const presentationsRef = collection(db, "presentations");
                    const q = query(presentationsRef, where("id", "==", action.payload));
                    const querySnapshot = await getDocs(q);

                    if (querySnapshot.empty) {
                        console.warn("No matching music profiles found.");
                        return;
                    }

                    const data = querySnapshot.docs[0].data();
                    action.asyncDispatch(mainAction(ACTIONS.LOAD_MUSIC_PROFILE_SUCCESS, data));
                } catch (err) {
                    console.error("Error loading music profile by ID:", err);
                    action.asyncDispatch(mainAction(ACTIONS.LOAD_MUSIC_PROFILE_FAIL, err));
                }
            })();
            return state;
        }

        case ACTIONS.LOAD_MUSIC_PROFILE_SUCCESS: {
            return _.cloneDeep(action.payload);
        }

        case ACTIONS.LOAD_MUSIC_PROFILE_FAIL: {
            return state;
        }

        default:
            return { ...state };
    }
}
