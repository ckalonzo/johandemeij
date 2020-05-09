import { ACTIONS } from 'redux/actions/types.js'
import { updatePost } from 'API/indexAPI'
import { mainAction } from "redux/actions/index.actions"
import {updatePostImage,createPost,uploadPostImage,createPostImage,deletePostImage,deletePost} from "API/indexAPI"
import _ from "lodash"
import { NavDropdown } from 'react-bootstrap'
const initialState = {
  currentID:''
};
export default function singlePostReducer (state = initialState, action) {
    switch (action.type) {
      case ACTIONS.CREATE_NEW_POST_IMAGE:{
        createPostImage(action.payload).then(json => {
          action.asyncDispatch(mainAction( ACTIONS.CREATE_NEW_POST_IMAGE_SUCCESS,json))
        }).catch(err =>{
          action.asyncDispatch(mainAction( ACTIONS.CREATE_NEW_POST_IMAGE_FAIL,err))
        })
        return state
      }
      case ACTIONS.CREATE_NEW_POST_IMAGE_SUCCESS:{
        let stateCopy = _.cloneDeep(state)
        action.asyncDispatch(mainAction(ACTIONS.LOAD_POST,stateCopy.ID))
        return state
      }
      case ACTIONS.CREATE_NEW_POST_IMAGE_FAIL:{
        return state
      }
      case ACTIONS.CREATE_NEW_POST: {
        createPost(action.payload).then(json =>{
          console.log(action,json)
          action.asyncDispatch(mainAction(ACTIONS.CREATE_NEW_POST_SUCCESS,json))
        }).catch(err => {
          console.log(action,err)
          action.asyncDispatch(mainAction(ACTIONS.CREATE_NEW_POST_FAIL,err))
        })
        return action.payload
      }
      case ACTIONS.CREATE_NEW_POST_SUCCESS: {
        return action.payload
      }
      case ACTIONS.CREATE_NEW_POST_FAIL: {
        return state
      }
      case ACTIONS.DELETE_POST:{
        
        let stateCopy = _.cloneDeep(state)
        deletePost(action.payload.image)
        .then((json)=>{
          action.asyncDispatch(mainAction(ACTIONS.DELETE_POST_SUCCESS,json))
        })
        .catch(err=>{
          action.asyncDispatch(mainAction(ACTIONS.DELETE_POST_FAIL,err))
        })
        stateCopy.currentID = action.payload.post
        return stateCopy
      }  
      case ACTIONS.DELETE_POST_SUCCESS:{
        action.asyncDispatch(mainAction(ACTIONS.LOAD_DASHBOARD_POSTS,[]))
        return state
      }  
      case ACTIONS.DELETE_POST_FAIL:{
        return action.payload
      }  
      case ACTIONS.DELETE_POST_IMAGE:{

        let stateCopy = _.cloneDeep(state)
        deletePostImage(action.payload.image)
        .then((json)=>{
          action.asyncDispatch(mainAction(ACTIONS.DELETE_POST_IMAGE_SUCCESS,json))
        })
        .catch(err=>{
          action.asyncDispatch(mainAction(ACTIONS.DELETE_POST_IMAGE_FAIL,err))
        })
        stateCopy.currentID = action.payload.post
        return stateCopy
      }  
      case ACTIONS.DELETE_POST_IMAGE_SUCCESS:{

        let stateCopy = _.cloneDeep(state)
        action.asyncDispatch(mainAction(ACTIONS.LOAD_POST,stateCopy.ID))

        return state
      }  
      case ACTIONS.DELETE_POST_IMAGE_FAIL:{
        
        return action.payload
      }  
      case ACTIONS.LOAD_ARTICLE:{
        return action.payload
      }
      case ACTIONS.LOAD_POST: {
       let stateCopy = _.cloneDeep(state)
       stateCopy.currentID = action.payload
        fetch ('http://localhost:5020/api/loadPostByID/'+ action.payload)
        .then((data)=> data.json())
        .then((res) => {
          action.asyncDispatch(mainAction(ACTIONS.LOAD_POST_SUCCESS,res.data))
        
        }).catch(err => action.asyncDispatch(mainAction(ACTIONS.LOAD_POST_FAIL,err)))
        return state
      }
      case  ACTIONS.LOAD_POST_SUCCESS:{
        
        return action.payload[0]
      }
      case  ACTIONS.LOAD_POST_FAIL:{
        return state
      }
      case ACTIONS.UPDATE_POST:{
        updatePost(action.payload).then(json=>{
          action.asyncDispatch(mainAction(ACTIONS.UPDATE_POST_SUCCESS,json.data.data))
        }).catch(err=>{
          action.asyncDispatch(mainAction(ACTIONS.UPDATE_POST_FAIL,err))
        })
        return state
      }
      case ACTIONS.UPDATE_POST_SUCCESS:{
        let stateCopy = _.cloneDeep(state)
        action.asyncDispatch(mainAction(ACTIONS.LOAD_POST,stateCopy.ID))
        return {state,...action.payload}
      }
      case ACTIONS.UPDATE_POST_FAIL:{
        return state
      }
      case ACTIONS.UPLOAD_IMAGE:{
        let stateCopy = _.cloneDeep(action.payload)
         let image = stateCopy.image
         uploadPostImage(image).then((json)=>{

          if(json.status!==404 || json.status!==500) {
            action.asyncDispatch(mainAction(ACTIONS.UPLOAD_IMAGE_SUCCESS,{submitted:stateCopy,json}))
          } else {
            action.asyncDispatch(mainAction(ACTIONS.UPLOAD_IMAGE_FAIL,json.response.message))
          }
        }).catch(err => action.asyncDispatch(mainAction(ACTIONS.UPLOAD_IMAGE_FAIL,err)))
      
        return state
      }
      case ACTIONS.UPLOAD_IMAGE_SUCCESS:{
          let stateCopy = _.cloneDeep(state)
          
          let newImage = {
            _id:action.payload.submitted._id,
            albumID:action.payload.submitted.albumID,
            caption:action.payload.submitted.caption,
            cover:action.payload.submitted.cover,
            imageName:action.payload.json.data.filename,
            updatedAt:Date.now()
          }
          stateCopy.currentID = action.payload.submitted.albumID
          action.asyncDispatch(mainAction( ACTIONS.UPDATE_POST_IMAGE,newImage))
        return stateCopy
      }
      case ACTIONS.UPLOAD_IMAGE_FAIL:{
        return state
      }
      case ACTIONS.UPDATE_POST_IMAGE:{
        
        updatePostImage(action.payload).then(json => {
          action.asyncDispatch(mainAction( ACTIONS.UPDATE_POST_IMAGE_SUCCESS,json))
        }).catch(err =>{
          action.asyncDispatch(mainAction( ACTIONS.UPDATE_POST_IMAGE_FAIL,err))
        })
        return state
      }
      case ACTIONS.UPDATE_POST_IMAGE_SUCCESS:{
        let stateCopy = _.cloneDeep(state)
        action.asyncDispatch(mainAction(ACTIONS.LOAD_POST,stateCopy.ID))
        return state
      }
      case ACTIONS.UPDATE_POST_IMAGE_FAIL:{
        return state
      }
      case ACTIONS.UPLOAD_POST_IMAGE:{
        let stateCopy = _.cloneDeep(action.payload)
        let image = stateCopy.image
        uploadPostImage(image).then((json)=>{

         if(json.status!==404 || json.status!==500) {
           action.asyncDispatch(mainAction(ACTIONS.UPLOAD_POST_IMAGE_SUCCESS,{submitted:stateCopy,json}))
         } else {
           action.asyncDispatch(mainAction(ACTIONS.UPLOAD_POST_IMAGE_FAIL,json.response.message))
         }
       }).catch(err => action.asyncDispatch(mainAction(ACTIONS.UPLOAD_IMAGE_FAIL,err)))
     
       return state
     }
      case ACTIONS.UPLOAD_POST_IMAGE_SUCCESS:{
        let stateCopy = _.cloneDeep(state)
         
         let newImage = {
           albumID:action.payload.submitted.albumID,
           caption:action.payload.submitted.caption,
           cover:action.payload.submitted.cover,
           imageName:action.payload.json.data.filename
         }
         stateCopy.currentID = action.payload.submitted.albumID
         action.asyncDispatch(mainAction( ACTIONS.CREATE_NEW_POST_IMAGE,newImage))
        return state
      }
      case ACTIONS.UPLOAD_POST_IMAGE_FAIL:{
        return state
      }
      
      default: 
        return state
       
    }
  }//No. 5 JPEG.jpg