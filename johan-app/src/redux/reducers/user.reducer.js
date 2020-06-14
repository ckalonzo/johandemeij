import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"
import { auth} from "../../firebase";
import _ from "lodash"
const initialState = {
   
};
export default function userReducer (state = initialState, action) {
    switch (action.type) {
  
      case ACTIONS.LOGIN_USER: {
          console.log(action)
        auth.signInWithEmailAndPassword(action.payload.email, action.payload.password).then((user)=>{
            action.asyncDispatch(mainAction(ACTIONS.LOGIN_USER_SUCCESS,user))
        }).catch(error => {
            action.asyncDispatch(mainAction(ACTIONS.LOGIN_USER_FAIL,{message:"Error signing in with password and email",error}))
          });
        return state
      }
      case  ACTIONS.LOGIN_USER_SUCCESS: {
       localStorage.setItem('user',action.payload.user);
        return action.payload.user
      }
      case  ACTIONS.LOGIN_USER_FAIL: {

        return state
      }
      case  ACTIONS.LOGOUT: {
        auth.signOut().then(()=>{
            action.asyncDispatch(mainAction(ACTIONS.LOGOUT_SUCCESS,[]))
        }).catch(error => {
            action.asyncDispatch(mainAction(ACTIONS.LOGOUT_ERROR,{message:"Error signing in with password and email",error}))
          });
        return state
      }
      case  ACTIONS.LOGOUT_SUCCESS: {

        return action.payload
      }
      case  ACTIONS.LOGOUT_ERROR: {
       
        return state
      }
      case  ACTIONS.LOGIN_CHECK: {
        
      if(action.payload)
      action.asyncDispatch(mainAction(ACTIONS.LOGIN_USER_SUCCESS,{user:action.payload}))
      action.asyncDispatch(mainAction(ACTIONS.LOGIN_USER_FAIL,[]))
        return state
      }
      default: 
        return {
          ...state
        }
    }
  }