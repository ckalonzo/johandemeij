import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"

const initialState = {};
export default function cdsReducer (state = initialState, action) {
    switch (action.type) {
  
      case ACTIONS.LOAD_CDS: {
       fetch('http://132.148.157.71:5021/api/api/loadCds')
        .then((data) => data.json())
        .then((res) => {
          action.asyncDispatch(mainAction(ACTIONS.LOAD_CDS_SUCCESS,res.data))
        }).catch(err => action.asyncDispatch(mainAction(ACTIONS.LOAD_CDS_FAIL,err)))

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