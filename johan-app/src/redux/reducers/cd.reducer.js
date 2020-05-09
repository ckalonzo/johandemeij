import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"
import  _ from "lodash"
import {createCd,updateCd,updateCdImage,uploadCDImage} from "API/indexAPI"
const initialState = {};
export default function cdReducer (state = initialState, action) {
    switch (action.type) {
  
        case ACTIONS.CREATE_NEW_CD: {
        createCd(action.payload).then(json =>{
            action.asyncDispatch(mainAction(ACTIONS.CREATE_NEW_CD_SUCCESS,json))
        }).catch(err => {
            console.log(action,err)
            action.asyncDispatch(mainAction(ACTIONS.CREATE_NEW_CD_FAIL,err))
        })
        return action.payload
        }
        case ACTIONS.CREATE_NEW_CD_SUCCESS: {
        return action.payload
        }
        case ACTIONS.CREATE_NEW_CD_FAIL: {
        return state
        }
        case ACTIONS.LOAD_CD: {
        let stateCopy = _.cloneDeep(state)
        stateCopy.currentID = action.payload
            fetch ('http://localhost:5020/api/loadCDByID/'+ action.payload)
            .then((data)=> data.json())
            .then((res) => {
            action.asyncDispatch(mainAction(ACTIONS.LOAD_CD_SUCCESS,res.data))
            
            }).catch(err => action.asyncDispatch(mainAction(ACTIONS.LOAD_CD_FAIL,err)))
            return state
        }
        case  ACTIONS.LOAD_CD_SUCCESS:{
            
            return action.payload.length > 0 ? action.payload[0]:[]
        }
        case  ACTIONS.LOAD_CD_FAIL:{
            return state
        }
        case ACTIONS.UPDATE_CD:{
        updateCd(action.payload).then(json=>{
            console.log(json)
            action.asyncDispatch(mainAction(ACTIONS.UPDATE_CD_SUCCESS,json.data.data))
        }).catch(err=>{
            action.asyncDispatch(mainAction(ACTIONS.UPDATE_CD_FAIL,err))
        })
        return state
        }
        case ACTIONS.UPDATE_CD_SUCCESS:{
        let stateCopy = _.cloneDeep(state)
        action.asyncDispatch(mainAction(ACTIONS.LOAD_CD,stateCopy.ID))
        return {state,...action.payload}
        }
        case ACTIONS.UPDATE_CD_FAIL:{
        return state
        }
        case ACTIONS.UPDATE_CD_IMAGE:{
            let stateCopy = _.cloneDeep(action.payload)
             let image = stateCopy.image
             updateCdImage(image).then((json)=>{
    
              if(json.status!==404 || json.status!==500) {
                action.asyncDispatch(mainAction(ACTIONS.UPDATE_CD_IMAGE_SUCCESS,{submitted:stateCopy,json}))
              } else {
                action.asyncDispatch(mainAction(ACTIONS.UPDATE_CD_IMAGE_FAIL,json.response.message))
              }
            }).catch(err => action.asyncDispatch(mainAction(ACTIONS.UPDATE_CD_IMAGE_FAIL,err)))
          
            return state
        }
        case ACTIONS.UPDATE_CD_IMAGE_SUCCESS:{
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
        case ACTIONS.UPDATE_CD_IMAGE_FAIL:{
            return state
        }
        case ACTIONS.UPLOAD_CD_IMAGE:{
          let stateCopy = _.cloneDeep(action.payload)
           let image = stateCopy.image
           console.log(action)
           uploadCDImage(image).then((json)=>{
  
            if(json.status!==404 || json.status!==500) {
              action.asyncDispatch(mainAction(ACTIONS.UPLOAD_CD_IMAGE_SUCCESS,{submitted:stateCopy,json}))
            } else {
              action.asyncDispatch(mainAction(ACTIONS.UPLOAD_CD_IMAGE_FAIL,json.response.message))
            }
          }).catch(err => action.asyncDispatch(mainAction(ACTIONS.UPLOAD_CD_IMAGE_FAIL,err)))
        
          return state
        }
        case ACTIONS.UPLOAD_CD_IMAGE_SUCCESS:{
          console.log(action)
            let stateCopy = _.cloneDeep(state)
            
            let image = ''
          if(action.payload.submitted.cover === "frontCover") {
            image = {
              _id:action.payload.submitted._id,
              frontCover:action.payload.json.data.filename,
              frontCaption:action.payload.submitted.caption 
            }
          } else {
            image = {
              _id:action.payload.submitted._id,
              backCover:action.payload.json.data.filename,
              backCaption:action.payload.submitted.caption 
            }
          }
            action.asyncDispatch(mainAction( ACTIONS.UPDATE_CD,image))
          return stateCopy
        }
        case ACTIONS.UPLOAD_CD_IMAGE_FAIL:{
          return state
        }
        case ACTIONS.UPDATE_CD_IMAGE:{
          console.log(action)
          let image = ''
          if(action.submitted.cover === "frontCover") {
            image = {
              frontCover:action.json.data.filename,
              frontCaption:action.submitted.caption 
            }
          } else {
            image = {
              backCover:action.json.data.filename,
              backCaption:action.submitted.caption 
            }
          }
          action.asyncDispatch(mainAction( ACTIONS.UPDATE_CD,image))
          return state
        }
      default: 
        return {
          ...state
        }
    }
  }