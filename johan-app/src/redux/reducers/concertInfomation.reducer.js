import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"
import { db } from "../../firebase";
import _ from 'lodash'
const initialState = {};
export default function concertInformationReducer (state = initialState, action) {
    switch (action.type) {
  
      case ACTIONS.SUBMIT_CONCERT_INFORMATION: {
     let stateCopy = action.payload
      db.collection("concertinformation")
      .add(stateCopy)
      .then(function(docRef){
        console.log(docRef)
        stateCopy._id = docRef.id
        action.asyncDispatch(mainAction(ACTIONS.SUBMIT_CONCERT_INFORMATION_SUCCESS,{status:"success"}))
      });
        return state
      }
      case ACTIONS.SUBMIT_CONCERT_INFORMATION_SUCCESS: {

        return action.payload
      }
      case ACTIONS.SUBMIT_CONCERT_INFORMATION_FAIL: {

        return state
      }
      case ACTIONS.LOAD_SUBMISSIONS: {

    db.collection("concertinformation")
     .get()
     .then(querySnapshot => {
       const data = querySnapshot.docs.map(doc => {doc.data()}); 
       console.log(data)
        action.asyncDispatch(mainAction(ACTIONS.LOAD_SUBMISSIONS_SUCCESS,data))
     });

        return state
      }
      case ACTIONS.LOAD_SUBMISSIONS_SUCCESS: {

        return action.payload
      }
      case ACTIONS.LOAD_SUBMISSIONS_FAIL: {

        return state
      }
      
      default: 
        return {
          ...state
        }
    }
  }