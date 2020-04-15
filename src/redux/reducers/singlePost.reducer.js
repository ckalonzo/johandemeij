import { ACTIONS } from 'redux/actions/types.js'
import { updatePost } from 'API/indexAPI'
import { mainAction } from "redux/actions/index.actions"


const initialState = {};
export default function singlePostReducer (state = initialState, action) {
    switch (action.type) {
      case ACTIONS.LOAD_ARTICLE:{
       console.log(action)
        return action.payload
      }
      case ACTIONS.LOAD_POST: {
        return action.payload
      }
      case ACTIONS.UPDATE_POST:{
       console.log(ACTIONS.UPDATE_POST,action)
        updatePost(action.payload).then(json=>{
          action.asyncDispatch(mainAction(ACTIONS.UPDATE_POST_SUCCESS,json.data.data))
        }).catch(err=>{
          action.asyncDispatch(mainAction(ACTIONS.UPDATE_POST_FAIL,err))
        })
        return state
      }
      case ACTIONS.UPDATE_POST_SUCCESS:{
        return {state,...action.payload}
      }
      case ACTIONS.UPDATE_POST_FAIL:{
        return state
      }
      default: 
        return state
       
    }
  }