import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"
import { db } from "../../firebase";
import  _ from "lodash"
import {createPresentation,updatePresentation,updatePresentationImage,uploadPresentationImage} from "API/indexAPI"
const initialState = {};
export default function presentationReducer (state = initialState, action) {
    switch (action.type) {
  
        case ACTIONS.CREATE_NEW_PUBLICATION: {
        createPresentation(action.payload).then(json =>{
            action.asyncDispatch(mainAction(ACTIONS.CREATE_NEW_PUBLICATION_SUCCESS,json))
        }).catch(err => {
            console.log(action,err)
            action.asyncDispatch(mainAction(ACTIONS.CREATE_NEW_PUBLICATION_FAIL,err))
        })
        return action.payload
        }
        case ACTIONS.CREATE_NEW_PUBLICATION_SUCCESS: {
        return action.payload
        }
        case ACTIONS.CREATE_NEW_PUBLICATION_FAIL: {
        return state
        }
        case ACTIONS.LOAD_PRESENTATION: {
        let stateCopy = _.cloneDeep(state)
        let _id = ''
            db.collection("presentations")
            .where("id","==",action.payload)
            .get()
            .then(querySnapshot => {
              const data = querySnapshot.docs.map(doc => {
                _id=doc.id
                return doc.data()});
              stateCopy = data
              stateCopy[0]._id = _id
              action.asyncDispatch(mainAction(ACTIONS.LOAD_PRESENTATION_SUCCESS,data))
            });
            return state
        }
        case  ACTIONS.LOAD_PRESENTATION_SUCCESS:{
            
            return action.payload.length > 0 ? action.payload[0]:[]
        }
        case  ACTIONS.LOAD_PRESENTATION_FAIL:{
            return state
        }
        case ACTIONS.UPDATE_PUBLICATION:{
      console.log(action)
        db.collection("presentations")
        .doc(action.payload._id)
        .update(action.payload).then(()=>{
          action.asyncDispatch(mainAction(ACTIONS.UPDATE_PUBLICATION_SUCCESS,action.payload))
        });
        return state
        }
        case ACTIONS.UPDATE_PUBLICATION_SUCCESS:{
        let stateCopy = _.cloneDeep(state)
        action.asyncDispatch(mainAction(ACTIONS.LOAD_PRESENTATION,stateCopy.id))
        return {state,...action.payload}
        }
        case ACTIONS.UPDATE_PUBLICATION_FAIL:{
        return state
        }
        case ACTIONS.UPDATE_PRESENTATION_IMAGE:{
            let stateCopy = _.cloneDeep(action.payload)
             let image = stateCopy.image
             updatePresentationImage(image).then((json)=>{
    
              if(json.status!==404 || json.status!==500) {
                action.asyncDispatch(mainAction(ACTIONS.UPDATE_PRESENTATION_IMAGE_SUCCESS,{submitted:stateCopy,json}))
              } else {
                action.asyncDispatch(mainAction(ACTIONS.UPDATE_PRESENTATION_IMAGE_FAIL,json.response.message))
              }
            }).catch(err => action.asyncDispatch(mainAction(ACTIONS.UPDATE_PRESENTATION_IMAGE_FAIL,err)))
          
            return state
        }
        case ACTIONS.UPDATE_PRESENTATION_IMAGE_SUCCESS:{
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
        case ACTIONS.UPDATE_PRESENTATION_IMAGE_FAIL:{
            return state
        }
        case ACTIONS.UPLOAD_PRESENTATION_IMAGE:{
          let stateCopy = _.cloneDeep(action.payload)
           let image = stateCopy.image
           console.log(action)
           uploadPresentationImage(image).then((json)=>{
  
            if(json.status!==404 || json.status!==500) {
              action.asyncDispatch(mainAction(ACTIONS.UPLOAD_PRESENTATION_IMAGE_SUCCESS,{submitted:stateCopy,json}))
            } else {
              action.asyncDispatch(mainAction(ACTIONS.UPLOAD_PRESENTATION_IMAGE_FAIL,json.response.message))
            }
          }).catch(err => action.asyncDispatch(mainAction(ACTIONS.UPLOAD_PRESENTATION_IMAGE_FAIL,err)))
        
          return state
        }
        case ACTIONS.UPLOAD_PRESENTATION_IMAGE_SUCCESS:{
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
            action.asyncDispatch(mainAction( ACTIONS.UPDATE_PUBLICATION,image))
          return stateCopy
        }
        case ACTIONS.UPLOAD_PRESENTATION_IMAGE_FAIL:{
          return state
        }
        case ACTIONS.UPDATE_PRESENTATION_IMAGE:{
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
          action.asyncDispatch(mainAction( ACTIONS.UPDATE_PUBLICATION,image))
          return state
        }
      default: 
        return {
          ...state
        }
    }
  }