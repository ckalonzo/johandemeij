import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"
import {updateEvent} from "API/indexAPI"
const initialState = {};
export default function eventsReducer (state = initialState, action) {
    switch (action.type) {
  
      case ACTIONS.LOAD_EVENTS: {
       fetch(' https://johandemeji.com/api/loadEvents')
        .then((data) => data.json())
        .then((res) => {
          action.asyncDispatch(mainAction(ACTIONS.LOAD_EVENTS_SUCCESS,res.data))
        }).catch(err => action.asyncDispatch(mainAction(ACTIONS.LOAD_EVENTS_FAIL,err)))

        return state
      }
      case ACTIONS.LOAD_EVENTS_SUCCESS: {
        return action.payload
      }
      case ACTIONS.LOAD_EVENTS_FAIL: {

        return state
      }
      case ACTIONS.LOAD_EVENT:{
        fetch(' https://johandemeji.com/api/loadEventByID/'+action.payload)
        .then((data) => data.json())
        .then((res) => {
          action.asyncDispatch(mainAction(ACTIONS.LOAD_EVENT_SUCCESS,res.data))
        }).catch(err => action.asyncDispatch(mainAction(ACTIONS.LOAD_EVENT_FAIL,err)))

        return state
      }
      case ACTIONS.LOAD_EVENT_SUCCESS:{
        return action.payload
      }
      case ACTIONS.LOAD_EVENT_FAIL:{
        return state
      }
      case ACTIONS.UPDATE_EVENT: {
        console.log(action)
        updateEvent(action.payload).then(json=>{
          console.log(json)
          action.asyncDispatch(mainAction(ACTIONS.UPDATE_EVENT_SUCCESS,json.data.data))
        }).catch(err=>{
         // action.asyncDispatch(mainAction(ACTIONS.UPDATE_EVENT_FAIL,err))
        })

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