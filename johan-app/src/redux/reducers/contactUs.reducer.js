import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"
import { db } from "../../firebase";
const initialState = {
   
};
export default function contactUsReducer (state = initialState, action) {
    switch (action.type) {
 
      case ACTIONS.SUBMIT_CONTACT_INFO: {
        let stateCopy = action.payload
        db.collection("contact")
        .add(stateCopy)
        .then(function(docRef){
          console.log(docRef)
          stateCopy._id = docRef.id
          action.asyncDispatch(mainAction(ACTIONS.SUBMIT_CONTACT_INFO_SUCCESS,{status:"success"}))
        });
        return state
      }
      case  ACTIONS.SUBMIT_CONTACT_INFO_SUCCESS: {
        return action.payload
      }
      case  ACTIONS.SUBMIT_CONTACT_INFO_FAIL: {

        return state
      }
      
      default: 
        return {
          ...state
        }
    }
  }