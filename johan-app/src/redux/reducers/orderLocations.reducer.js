import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"
import { db } from "../../firebase";
import _ from 'lodash'
const initialState = {};
export default function orderReducer (state = initialState, action) {
    switch (action.type) {
  
      case ACTIONS.LOAD_ORDER_LOCATIONS: {
      //  fetch('http://127.0.0.1:5021/api/loadOrders')
      //   .then((data) => data.json())
      //   .then((res) => {
      //     action.asyncDispatch(mainAction(ACTIONS.LOAD_ORDER_LOCATIONS_SUCCESS,res.data))
      //   }).catch(err => action.asyncDispatch(mainAction(ACTIONS.LOAD_ORDER_LOCATIONS_FAIL,err)))
      db.collection("orders")
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        action.asyncDispatch(mainAction(ACTIONS.LOAD_ORDER_LOCATIONS_SUCCESS,data))
      });

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