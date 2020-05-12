import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"
import  _ from "lodash"
const initialState = {};
export default function AllPresentationsReducer (state = initialState, action) {
    switch (action.type) {
  
      case ACTIONS.LOAD_ALL_PRESENTATIONS: {
       fetch('https://127.0.0.1:5021/api/loadAllPresentations')
        .then((data) => data.json())
        .then((res) => {
          action.asyncDispatch(mainAction(ACTIONS.LOAD_ALL_PRESENTATIONS_SUCCESS,res.data))
        }).catch(err => action.asyncDispatch(mainAction(ACTIONS.LOAD_ALL_PRESENTATIONS_FAIL,err)))

        return state
      }
      case ACTIONS.LOAD_ALL_PRESENTATIONS_SUCCESS: {
        return action.payload
      }
      case ACTIONS.LOAD_ALL_PRESENTATIONS_FAIL: {

        return state
      }
      
      default: 
        return {
          ...state
        }
    }
  }