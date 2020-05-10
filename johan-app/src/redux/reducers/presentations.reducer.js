import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"
import  _ from "lodash"
const initialState = {};
export default function presentationsReducer (state = initialState, action) {
    switch (action.type) {
  
      case ACTIONS.LOAD_PRESENTATIONS: {
       fetch('http://http://132.148.157.71:5021/api/loadPresentations/' + action.payload.skip + '/' + action.payload.limit)
        .then((data) => data.json())
        .then((res) => {
          action.asyncDispatch(mainAction(ACTIONS.LOAD_PRESENTATIONS_SUCCESS,res.data))
        }).catch(err => action.asyncDispatch(mainAction(ACTIONS.LOAD_PRESENTATIONS_FAIL,err)))

        return state
      }
      case ACTIONS.LOAD_PRESENTATIONS_SUCCESS: {
        return _.sortBy(action.payload,['cdName','asc'])
      }
      case ACTIONS.LOAD_PRESENTATIONS_FAIL: {

        return state
      }
      
      default: 
        return {
          ...state
        }
    }
  }