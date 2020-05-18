import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"
import {updateEvent} from "API/indexAPI"
import { db } from "../../firebase";
import _ from 'lodash'
const initialState = {};
export default function eventsReducer (state = initialState, action) {
    switch (action.type) {
  
      case ACTIONS.LOAD_EVENTS: {
        db.collection("events")
       .where("id",'==','53')
        .get()
        .then(querySnapshot => {
          const data = querySnapshot.docs.map(doc => doc.data());
          action.asyncDispatch(mainAction(ACTIONS.LOAD_EVENT_SUCCESS,data))
        });
        return state
      }
      case ACTIONS.LOAD_EVENTS_SUCCESS: {
        return action.payload
      }
      case ACTIONS.LOAD_EVENTS_FAIL: {

        return state
      }
      case ACTIONS.LOAD_EVENT:{
        db.collection("events")
       .where("id",'==','53')
        .get()
        .then(querySnapshot => {
          const data = querySnapshot.docs.map(doc => doc.data());
          action.asyncDispatch(mainAction(ACTIONS.LOAD_EVENT_SUCCESS,data))
        });

        return state
      }
      case ACTIONS.LOAD_EVENT_SUCCESS:{
        return action.payload
      }
      case ACTIONS.LOAD_EVENT_FAIL:{
        return state
      }
      case ACTIONS.UPDATE_EVENT: {
        db.collection("events").doc("aa193720-9482-11ea-9b06-bd9ba17d908b")
        .update(action.payload).then(()=>{
           action.asyncDispatch(mainAction(ACTIONS.UPDATE_EVENT_SUCCESS,action.payload))
        });
        return state
      }
      case ACTIONS.UPDATE_EVENT_SUCCESS: {
        return state
      }
      case ACTIONS.UPDATE_EVENT_FAIL: {

        return state
      }
      
      default: 
        return {
          ...state
        }
    }
  }