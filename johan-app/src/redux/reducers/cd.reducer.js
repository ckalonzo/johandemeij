import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"
import { db,storage} from "../../firebase";
import  _ from "lodash"
const initialState = {};
export default function cdReducer (state = initialState, action) {
    switch (action.type) {
  
        case ACTIONS.CREATE_NEW_CD: {
        let stateCopy = _.cloneDeep(action.payload)
        console.log(action.payload)
          db.collection("cds")
          .add(stateCopy)
          .then((docRef)=>{
            stateCopy._id = docRef.id
            db.collection("cds")
            .doc(docRef.id)
            .update({_id:docRef.id}).then(()=>{
              action.asyncDispatch(mainAction(ACTIONS.CREATE_NEW_CD_SUCCESS,stateCopy))
            });
           
          });
        return action.payload
        }
        case ACTIONS.CREATE_NEW_CD_SUCCESS: {
        return action.payload
        }
        case ACTIONS.CREATE_NEW_CD_FAIL: {
        return state
        }
        case ACTIONS.DELETE_CD_IMAGE:{
          let image = {},
          cd= {}
      if(action.payload.cover === "main"){
        image = {
          albumID: action.payload.albumID,
          cover: action.payload.cover ? action.payload.cover:"",
          imageName:action.payload.image.name
        }
      } else {
        image = {
          albumID: action.payload.albumID,
          caption: action.payload.caption ? action.payload.caption :"",
          cover: action.payload.cover ? action.payload.cover:"",
          imageName:action.payload.image.name
        }
      }


      if(action.payload.cover === "frontCover"){
       cd = {
         frontCover : action.payload.image.name,
         frontCaption:action.payload.caption ? action.payload.caption :"",
       }
      } else  if(action.payload.cover === "backCover"){
        cd = {
          backCover : action.payload.image.name,
          backCaption:action.payload.caption ? action.payload.caption :"",
        }
      } else {
        cd = {
          cdImage : action.payload.image.name
        }
      }
  
         db.collection("cds").doc(action.payload.docId)
         .update(cd).then(()=>{   
  
            db.collection("cds")
            .where('id','==',action.payload.ID)
            .where('cover','==',action.payload.imageType)
             .get()
             .then((querySnapshot) => {
              console.log(querySnapshot.docs)
              querySnapshot.forEach((doc)=>{
                 console.log(doc.ref.id,doc.ref.parent,doc.ref.path)
                 doc.ref.delete()
                })
              action.asyncDispatch(mainAction(ACTIONS.DELETE_CD_IMAGE_SUCCESS,action.payload))
             });
         });
  
          
          return state
        }  
        case ACTIONS.DELETE_CD_IMAGE_SUCCESS:{
          let postImageRef = storage.ref('posts/'+action.payload.name)
          postImageRef.delete().then(()=>console.log("file deleted"));
          action.asyncDispatch(mainAction(ACTIONS.LOAD_PRESENTATION,action.payload.ID))
          return state
        }  
        case ACTIONS.DELETE_CD_IMAGE_FAIL:{
          
          return action.payload
        }  
        case ACTIONS.LOAD_CD: {
        let stateCopy = _.cloneDeep(state)
        let _id = ''
            db.collection("cds")
            .where("id","==",action.payload)
            .get()
            .then(querySnapshot => {
              const data = querySnapshot.docs.map(doc =>{ 
                _id = doc.id
               return  doc.data()});
               if(data)
               stateCopy = data
               stateCopy[0]._id = _id
              action.asyncDispatch(mainAction(ACTIONS.LOAD_CD_SUCCESS,stateCopy))
            });
            return state
        }
        case  ACTIONS.LOAD_CD_SUCCESS:{
            
            return action.payload.length > 0 ? action.payload[0]:[]
        }
        case  ACTIONS.LOAD_CD_FAIL:{
            return state
        }
        case ACTIONS.UPDATE_CD:{
          
        db.collection("cds").doc(action.payload._id)
          .update(action.payload).then(()=>{
            console.log("success")
          action.asyncDispatch(mainAction(ACTIONS.UPDATE_CD_SUCCESS,action.payload))
        });
        return state
        }
        case ACTIONS.UPDATE_CD_SUCCESS:{
        let stateCopy = _.cloneDeep(state)
        action.asyncDispatch(mainAction(ACTIONS.LOAD_CD,stateCopy.id))
        return {state,...action.payload}
        }
        case ACTIONS.UPDATE_CD_FAIL:{
        return state
        }
        case ACTIONS.UPDATE_CD_IMAGE:{
            // let stateCopy = _.cloneDeep(action.payload)
            //  let image = stateCopy.image
            //  updateCdImage(image).then((json)=>{
    
            //   if(json.status!==404 || json.status!==500) {
            //     action.asyncDispatch(mainAction(ACTIONS.UPDATE_CD_IMAGE_SUCCESS,{submitted:stateCopy,json}))
            //   } else {
            //     action.asyncDispatch(mainAction(ACTIONS.UPDATE_CD_IMAGE_FAIL,json.response.message))
            //   }
            // }).catch(err => action.asyncDispatch(mainAction(ACTIONS.UPDATE_CD_IMAGE_FAIL,err)))
          
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
          let image = {},
              cd= {}
          if(action.payload.cover === "main"){
            image = {
              albumID: action.payload.albumID,
              cover: action.payload.cover ? action.payload.cover:"",
              imageName:action.payload.image.name
            }
          } else {
            image = {
              albumID: action.payload.albumID,
              caption: action.payload.caption ? action.payload.caption :"",
              cover: action.payload.cover ? action.payload.cover:"",
              imageName:action.payload.image.name
            }
          }


          if(action.payload.cover === "frontCover"){
           cd = {
             frontCover : action.payload.image.name,
             frontCaption:action.payload.caption ? action.payload.caption :"",
           }
          } else  if(action.payload.cover === "backCover"){
            cd = {
              backCover : action.payload.image.name,
              backCaption:action.payload.caption ? action.payload.caption :"",
            }
          } else {
            cd = {
              cdImage : action.payload.image.name
            }
          }
        db.collection("cds").doc(action.payload.docId)
        .update(cd).then(()=>{   
            db.collection("postimages")
            .doc()
            .set(image)
            .then(() => {
              action.asyncDispatch(mainAction(ACTIONS.UPLOAD_CD_IMAGE_SUCCESS,action.payload))
            });
         });

        action.asyncDispatch(mainAction(ACTIONS.UPLOAD_CD_IMAGE_SUCCESS,action.payload))
          return state
        }
        case ACTIONS.UPLOAD_CD_IMAGE_SUCCESS:{
          let path = ''
          if(action.payload.cover === "main"){
            path = "music_catalogue/"
          } else {
            path = "posts/"
          }

          let postImageRef = storage.ref(path+action.payload.image.name).put(action.payload.image);
          postImageRef.on('state_changed',(snapshot)=>{
            //progress function
          },(error)=>{
            //error
            console.log(error)
          },()=>{
            //complete
            storage.ref(path).child(action.payload.image.name).getDownloadURL().then(url=>{
              console.log(url)
              action.asyncDispatch(mainAction(ACTIONS.LOAD_PRESENTATION,action.payload.albumID))
            })
          })
          return state
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