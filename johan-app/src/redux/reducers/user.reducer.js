import { ACTIONS } from 'redux/actions/types.js';
import { mainAction } from "redux/actions/index.actions";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

const initialState = {};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case ACTIONS.LOGIN_USER: {
            (async () => {
                try {
                    const userCredential = await signInWithEmailAndPassword(auth, action.payload.email, action.payload.password);
                    action.asyncDispatch(mainAction(ACTIONS.LOGIN_USER_SUCCESS, userCredential.user));
                } catch (error) {
                    action.asyncDispatch(mainAction(ACTIONS.LOGIN_USER_FAIL, {
                        message: "Error signing in with email and password",
                        error
                    }));
                }
            })();
            return state;
        }

        case ACTIONS.LOGIN_USER_SUCCESS: {
            localStorage.setItem('user', JSON.stringify(action.payload));
            return action.payload;
        }

        case ACTIONS.LOGIN_USER_FAIL: {
            return state;
        }

        case ACTIONS.LOGOUT: {
            (async () => {
                try {
                    await signOut(auth);
                    action.asyncDispatch(mainAction(ACTIONS.LOGOUT_SUCCESS, {}));
                } catch (error) {
                    action.asyncDispatch(mainAction(ACTIONS.LOGOUT_ERROR, {
                        message: "Error signing out",
                        error
                    }));
                }
            })();
            return state;
        }

        case ACTIONS.LOGOUT_SUCCESS: {
            return {};
        }

        case ACTIONS.LOGOUT_ERROR: {
            return state;
        }

        case ACTIONS.LOGIN_CHECK: {
            if (action.payload) {
                action.asyncDispatch(mainAction(ACTIONS.LOGIN_USER_SUCCESS, { user: action.payload }));
            } else {
                action.asyncDispatch(mainAction(ACTIONS.LOGIN_USER_FAIL, {}));
            }
            return state;
        }

        default:
            return { ...state };
    }
}
