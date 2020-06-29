import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"
import { db,storage} from "../../firebase";
import  _ from "lodash"
import {updatePresentationImage} from "API/indexAPI"
const initialState = {};
export default function presentationReducer (state = initialState, action) {
    switch (action.type) {
      case ACTIONS.DELETE_PRESENTATION_IMAGE:{
        let presentation= {}
        if(action.payload.imageType === "frontCover"){
         presentation = {
           frontCover : "",
           frontCaption:"",
         }
        } else {
          presentation = {
            backCover : "",
            backCaption:"",
          }
        }

       db.collection("presentations").doc(action.payload.docId)
       .update(presentation).then(()=>{   

          db.collection("postimages")
          .where('albumID','==',action.payload.ID)
          .where('cover','==',action.payload.imageType)
           .get()
           .then((querySnapshot) => {
            console.log(querySnapshot.docs)
            querySnapshot.forEach((doc)=>{
               console.log(doc.ref.id,doc.ref.parent,doc.ref.path)
               doc.ref.delete()
              })
            action.asyncDispatch(mainAction(ACTIONS.DELETE_PRESENTATION_IMAGE_SUCCESS,action.payload))
           });
       });

        
        return state
      }  
      case ACTIONS.DELETE_PRESENTATION_IMAGE_SUCCESS:{
        let postImageRef = storage.ref('posts/'+action.payload.name)
        postImageRef.delete().then(()=>console.log("file deleted"));
        action.asyncDispatch(mainAction(ACTIONS.LOAD_PRESENTATION,action.payload.ID))
        return state
      }  
      case ACTIONS.DELETE_PRESENTATION_IMAGE_FAIL:{
        
        return action.payload
      }  
        case ACTIONS.CREATE_NEW_PUBLICATION: {
          let stateCopy = _.cloneDeep(action.payload)
      
          db.collection("presentations")
            .add(stateCopy)
            .then(function(docRef){
              stateCopy._id = docRef.id
              db.collection("presentations")
              .doc(docRef.id)
              .update({_id:docRef.id}).then(()=>{
                action.asyncDispatch(mainAction(ACTIONS.CREATE_NEW_PUBLICATION_SUCCESS,stateCopy))
              });
             
            });
        return stateCopy
        }
        case ACTIONS.CREATE_NEW_PUBLICATION_SUCCESS: {
        return action.payload
        }
        case ACTIONS.CREATE_NEW_PUBLICATION_FAIL: {
        return state
        }
        case  ACTIONS.DELETE_PRESENTATION:{
          db.collection("presentations")
          .where("id","==",action.payload)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc)=>{
               console.log(doc.ref.id,doc.ref.parent,doc.ref.path)
              doc.ref.delete()
              })
            action.asyncDispatch(mainAction(ACTIONS.DELETE_PRESENTATION_SUCCESS,action.payload))
           });
          return state
        }
        case  ACTIONS.DELETE_PRESENTATION_SUCCESS:{
          action.asyncDispatch(mainAction(ACTIONS.LOAD_PRESENTATIONS,[]))
          return state
        }
        case  ACTIONS.DELETE_PRESENTATION_FAIL:{
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
              //  _id=doc.id
                return doc.data()});
              stateCopy = data
            //  stateCopy[0]._id = _id
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
      let stateCopy = _.cloneDeep(action.payload)
      db.collection("presentations")
      .where("id", "==", stateCopy.id).get()
      .then((querySnapshot)=>{
        let _id=''
        const data = querySnapshot.docs.map(doc =>{
         _id = doc.ref.id
          return  doc.data()
        })
        stateCopy._id = _id
        console.log(stateCopy)
        db.collection("presentations")
        .doc(_id)
        .update(stateCopy).then((snapshot)=>{
          console.log(snapshot)
          action.asyncDispatch(mainAction(ACTIONS.UPDATE_PUBLICATION_SUCCESS,stateCopy))
        });
       })
      .catch((err)=>{
        action.asyncDispatch(mainAction(ACTIONS.UPDATE_PUBLICATION_FAIL,err))
      })
       
        return state
        }
        case ACTIONS.UPDATE_PUBLICATION_SUCCESS:{
        let stateCopy = _.cloneDeep(action.payload)
        action.asyncDispatch(mainAction(ACTIONS.LOAD_PRESENTATION,stateCopy.id))
        window.location.reload(true);
        return {state,...stateCopy.payload}
        }
        case ACTIONS.UPDATE_PUBLICATION_FAIL:{
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
          let image = {
            albumID: action.payload.albumID,
            caption: action.payload.caption ? action.payload.caption :"",
            cover: action.payload.cover ? action.payload.cover:"",
            imageName:action.payload.image.name
          }
          let presentation= {}
          if(action.payload.cover === "frontCover"){
           presentation = {
             frontCover : action.payload.image.name,
             frontCaption:action.payload.caption ? action.payload.caption :"",
           }
          } else {
            presentation = {
              backCover : action.payload.image.name,
              backCaption:action.payload.caption ? action.payload.caption :"",
            }
          }
          db.collection("presentations")
      .where("id", "==", stateCopy.albumID).get()
      .then((querySnapshot)=>{
        let _id=''
        const data = querySnapshot.docs.map(doc =>{
         _id = doc.ref.id
          return  doc.data()
        })
        stateCopy._id = _id

        db.collection("presentations").doc(_id)
        .update(presentation).then(()=>{   
            db.collection("postimages")
            .doc()
            .set(image)
            .then(() => {
              action.asyncDispatch(mainAction(ACTIONS.UPLOAD_PRESENTATION_IMAGE_SUCCESS,action.payload))
            });


        });
       })
      .catch((err)=>{
        action.asyncDispatch(mainAction(ACTIONS.UPDATE_PUBLICATION_FAIL,err))
      })
        

        
         
          return state
        }
        case ACTIONS.UPLOAD_PRESENTATION_IMAGE_SUCCESS:{
          let postImageRef = storage.ref('posts/'+action.payload.image.name).put(action.payload.image);
          postImageRef.on('state_changed',(snapshot)=>{
            //progress function
          },(error)=>{
            //error
            console.log(error)
          },()=>{
            //complete
            storage.ref('/posts').child(action.payload.image.name).getDownloadURL().then(url=>{
              console.log(url)
              action.asyncDispatch(mainAction(ACTIONS.LOAD_PRESENTATION,action.payload.albumID))
            })
          })
          return state
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
      case ACTIONS.UPDATE_CAPTION:{
        let stateCopy = _.cloneDeep(action.payload)
        let image = {
          albumID: action.payload.albumID,
          caption: action.payload.caption ? action.payload.caption :"",
          cover: action.payload.cover ? action.payload.cover:"",
        }
        let presentation= {}
        if(action.payload.cover === "frontCover"){
         presentation = {
           frontCover : action.payload.image.name,
           frontCaption:action.payload.caption ? action.payload.caption :"",
         }
        } else {
          presentation = {
            backCover : action.payload.image.name,
            backCaption:action.payload.caption ? action.payload.caption :"",
          }
        }
        db.collection("presentations")
    .where("id", "==", stateCopy.albumID).get()
    .then((querySnapshot)=>{
      let _id=''
      const data = querySnapshot.docs.map(doc =>{
       _id = doc.ref.id
        return  doc.data()
      })
      stateCopy._id = _id

      db.collection("presentations").doc(_id)
      .update(presentation).then(()=>{   
        action.asyncDispatch(mainAction(ACTIONS.UPDATE_CAPTION_SUCCESS,action.payload))
      });
     })
    .catch((err)=>{
      action.asyncDispatch(mainAction(ACTIONS.UPDATE_CAPTION_FAIL,err))
    })
        return state
      }
      case ACTIONS.UPDATE_CAPTION_SUCCESS:{
        return state
      }
      default: 
        return {
          ...state
        }
    }
  }