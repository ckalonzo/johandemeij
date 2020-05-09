import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"

const initialState = {};
export default function postImagesReducer (state = initialState, action) {
    switch (action.type) {
  
      case ACTIONS.LOAD_POST_IMAGES:{
        fetch('http://localhost:5020/api/loadPostImages')
        .then((data) => data.json())
        .then((res) => {
          action.asyncDispatch(mainAction(ACTIONS.LOAD_POST_IMAGES_SUCCESS,res.data))
        }).catch(err => action.asyncDispatch(mainAction(ACTIONS.LOAD_POST_IMAGES_FAIL,err)))
        return state
      }
      case ACTIONS.LOAD_POST_IMAGES_SUCCESS:{
        
        return {state,...action.payload}
      }
      case ACTIONS.LOAD_POST_IMAGES_FAIL:{
        return state
      }
      default: 
        return state
       
    }
  }