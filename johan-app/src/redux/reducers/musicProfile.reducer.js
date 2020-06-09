import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"
import { db } from "../../firebase";
const initialState = {
   
};
export default function musicProfileReducer (state = initialState, action) {
    switch (action.type) {
  
      case ACTIONS.LOAD_MUSIC_PROFILE: {
      db.collection("presentations")
       .where("id",'==',action.payload)
         .get()
         .then(querySnapshot => {
           const data = querySnapshot.docs.map(doc => doc.data());
           action.asyncDispatch(mainAction(ACTIONS.LOAD_MUSIC_PROFILE_SUCCESS,...data))
         });
     
        return state
      }
      case ACTIONS.LOAD_MUSIC_PROFILE_BY_ID:{
        db.collection("presentations")
       .where("id",'==',action.payload)
         .get()
         .then(querySnapshot => {
           const data = querySnapshot.docs.map(doc => doc.data());
           action.asyncDispatch(mainAction(ACTIONS.LOAD_MUSIC_PROFILE_SUCCESS,...data))
         });
        return state
      }
      
      case ACTIONS.LOAD_MUSIC_PROFILE_SUCCESS: {
        return action.payload
      }
      case ACTIONS.LOAD_MUSIC_PROFILE_FAIL: {

        return state
      }
      
      
      default: 
        return {
          ...state
        }
    }
  }