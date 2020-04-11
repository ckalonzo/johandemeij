import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"
import {uploadImage} from "API/indexAPI"
import _ from "lodash"
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
        console.log(image)
        action.asyncDispatch(mainAction(ACTIONS.LOAD_POST_IMAGE_SUCCESS,image))
          return state
      }
      case ACTIONS.LOAD_POST_IMAGE_SUCCESS:{
        console.log(action)
        return action.payload
      }
      case ACTIONS.UPLOAD_IMAGE:{
        uploadImage(action.payload).then((json)=>{
          action.asyncDispatch(mainAction(ACTIONS.UPLOAD_IMAGE_SUCCESS,json))
        }).catch(err => action.asyncDispatch(mainAction(ACTIONS.UPLOAD_IMAGE_FAIL,err)))
        return state
      }
      case ACTIONS.UPLOAD_IMAGE_SUCCESS:{
          let stateCopy = _.cloneDeep(state)
          let image = action.json ? action.json.data.filename:''
          stateCopy.imageName = image
        return stateCopy
      }
      case ACTIONS.UPLOAD_IMAGE_FAIL:{
        return state
      }
      default: 
        return state
       
    }
  }