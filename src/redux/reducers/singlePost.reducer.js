import { ACTIONS } from 'redux/actions/types.js'
import { getPost } from "API/indexAPI"
import { mainAction } from "redux/actions/index.actions"

const initialState = {};
export default function singlePostReducer (state = initialState, action) {
    switch (action.type) {
  
      case ACTIONS.EDIT_POST:{
        //action.asyncDispatch(mainAction(ACTIONS.EDIT_POST_SUCCESS,action.payload))
        // getPost({_id:action.payload})
        // .then(json=>{
        //     action.asyncDispatch(mainAction(ACTIONS.EDIT_POST_SUCCESS,json.data.data))
        //     
        // })
        // .catch(err=>{
        //     action.asyncDispatch(mainAction(ACTIONS.EDIT_POST_FAIL,err))
        // })
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