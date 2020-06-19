import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"
import { db } from "../../firebase";
const initialState = {};
export default function cdsReducer (state = initialState, action) {
    switch (action.type) {
  
      case ACTIONS.LOAD_CDS: {
     
        db.collection("cds")
        .orderBy("cd_name","asc")
          .get()
          .then(querySnapshot => {
            const data = querySnapshot.docs.map(doc => doc.data());
            action.asyncDispatch(mainAction(ACTIONS.LOAD_CDS_SUCCESS,data))
          });
  
        return state
      }
      case ACTIONS.LOAD_CDS_SUCCESS: {
        return action.payload
      }
      case ACTIONS.LOAD_CDS_FAIL: {

        return state
      }
      
      default: 
        return {
          ...state
        }
    }
  }