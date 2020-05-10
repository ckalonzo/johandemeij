import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"

const initialState = {};
export default function orderReducer (state = initialState, action) {
    switch (action.type) {
  
      case ACTIONS.LOAD_ORDER_LOCATIONS: {
       fetch('http://http://132.148.157.71:5021/api/loadOrders')
        .then((data) => data.json())
        .then((res) => {
          action.asyncDispatch(mainAction(ACTIONS.LOAD_ORDER_LOCATIONS_SUCCESS,res.data))
        }).catch(err => action.asyncDispatch(mainAction(ACTIONS.LOAD_ORDER_LOCATIONS_FAIL,err)))

        return state
      }
      case ACTIONS.LOAD_ORDER_LOCATIONS_SUCCESS: {
        return action.payload
      }
      case ACTIONS.LOAD_ORDER_LOCATIONS_FAIL: {

        return state
      }
      
      default: 
        return {
          ...state
        }
    }
  }