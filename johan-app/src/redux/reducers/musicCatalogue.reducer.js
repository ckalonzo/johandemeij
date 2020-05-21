import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"
import { db } from "../../firebase";
const initialState = {};
export default function catalogueReducer (state = initialState, action) {
    switch (action.type) {
  
      case ACTIONS.LOAD_MUSIC_CATALOGUE: {
      db.collection("musicalbums")
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        action.asyncDispatch(mainAction(ACTIONS.LOAD_MUSIC_CATALOGUE_SUCCESS,data))
      });


        return state
      }
      case ACTIONS.LOAD_MUSIC_CATALOGUE_SUCCESS: {
        return action.payload
      }
      case ACTIONS.LOAD_MUSIC_CATALOGUE_FAIL: {

        return state
      }
      
      default: 
        return {
          ...state
        }
    }
  }