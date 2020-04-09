import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"
import {uploadImage} from "API/indexAPI"
import _ from "lodash"
const initialState = {};
export default function postImageReducer (state = initialState, action) {
    switch (action.type) {
      case ACTIONS.LOAD_POST_IMAGE:{
          let image = action.payload.image[0]
          return {...image}
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