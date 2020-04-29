import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"
const initialState = {};
export default function postImageReducer (state = initialState, action) {
    switch (action.type) {
      case ACTIONS.RESET_IMAGE:{
        let image = [];
        return image;
      }
      case ACTIONS.LOAD_POST_IMAGE:{
        let image ='' 
        Object.values(action.payload.images).map(postImage => {
          
        if(postImage.albumID === action.payload.ID){
          image = postImage;
          return postImage
        }
          return null
          
        })
        action.asyncDispatch(mainAction(ACTIONS.LOAD_POST_IMAGE_SUCCESS,image))
          return state
      }
      case ACTIONS.LOAD_POST_IMAGE_SUCCESS:{
        console.log(action)
        return action.payload
      }
      
      default: 
        return state
       
    }
  }