import { ACTIONS } from 'redux/actions/types.js'

const initialState = {};
export default function singlePostReducer (state = initialState, action) {
    switch (action.type) {
  
      case ACTIONS.EDIT_POST:{
        return {...action.payload}
      }
      case ACTIONS.EDIT_POST_SUCCESS:{
        return {state,...action.payload}
      }
      case ACTIONS.EDIT_POST_FAIL:{
        return state
      }
      default: 
        return state
       
    }
  }