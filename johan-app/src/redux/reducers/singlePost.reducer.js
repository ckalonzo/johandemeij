import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"
import {updatePostImage,uploadPostImage,createPostImage} from "API/indexAPI"
import { db,storage} from "../../firebase";
import _ from 'lodash'
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
        let stateCopy = _.cloneDeep(action.payload)
      
        db.collection("posts")
          .add(stateCopy)
          .then(function(docRef){
            console.log(docRef)
            stateCopy._id = docRef.id
            action.asyncDispatch(mainAction(ACTIONS.CREATE_NEW_POST_SUCCESS,stateCopy))
          });
        return stateCopy
      }
      case ACTIONS.CREATE_NEW_POST_SUCCESS: {
        return action.payload
      }
      case ACTIONS.CREATE_NEW_POST_FAIL: {
        return state
      }
      case ACTIONS.DELETE_POST:{

         db.collection("posts")
         .where('ID','==',action.payload)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc)=> doc.ref.delete())
            action.asyncDispatch(mainAction(ACTIONS.DELETE_POST_SUCCESS,[]))
          });
        return state
      }  
      case ACTIONS.DELETE_POST_SUCCESS:{
        action.asyncDispatch(mainAction(ACTIONS.LOAD_DASHBOARD_POSTS,[]))
        return state
      }  
      case ACTIONS.DELETE_POST_FAIL:{
        return action.payload
      }  
      case ACTIONS.DELETE_POST_IMAGE:{
        console.log(action)
        db.collection("postimages")
        .where('albumID','==',action.payload.ID)
         .get()
         .then((querySnapshot) => {
           querySnapshot.forEach((doc)=> doc.ref.delete())
           action.asyncDispatch(mainAction(ACTIONS.DELETE_POST_IMAGE_SUCCESS,action.payload))
         });
        return state
      }  
      case ACTIONS.DELETE_POST_IMAGE_SUCCESS:{

        let postImageRef = storage.ref('images/posts/'+action.payload.name)
        postImageRef.delete().then(()=>console.log("file deleted"));
        action.asyncDispatch(mainAction(ACTIONS.LOAD_POST,action.payload.ID))
        return state
      }  
      case ACTIONS.DELETE_POST_IMAGE_FAIL:{
        
        return action.payload
      }  
      case ACTIONS.LOAD_ARTICLE:{
        return action.payload
      }
      case ACTIONS.LOAD_POST: {
        let post_id = ''

        //////====>
        db.collection("posts")
        //.where("ID",'==',action.payload)
        .where("ID",'==',action.payload)
         .get()
         .then(querySnapshot => {
           const data = querySnapshot.docs.map(doc => {
            post_id=doc.id
            return doc.data()}); 

            let stateCopy = _.cloneDeep(data)
            if(stateCopy[0])
            stateCopy[0]._id = post_id
            let _id = ''
            action.asyncDispatch(mainAction(ACTIONS.LOAD_POST_SUCCESS,stateCopy))
             //=======================================================

                  db.collection("postimages")
                  .where("albumID",'==',action.payload)
                  .get()
                  .then(snapshotChanges => {
                    
                      const data = snapshotChanges.docs.map(doc => {
                        _id=doc.id
                        return doc.data()});
                      
                      stateCopy.map((post,i)=>{
                    //    data[0]._id =  _id
                      return stateCopy[i].image = data
                    })
                    if (snapshotChanges.size > 0) 
                    action.asyncDispatch(mainAction(ACTIONS.LOAD_POST_SUCCESS,stateCopy))
                   // action.asyncDispatch(mainAction(ACTIONS.LOAD_POST_FAIL,{error:"could not find this record"}))
                  });

              //========================================================

         });
          //////====>
        return state
      }
      case  ACTIONS.LOAD_POST_SUCCESS:{
        
        return {state,...action.payload[0]}
      }
      case  ACTIONS.LOAD_POST_FAIL:{
        return state
      }
      case ACTIONS.UPDATE_POST:{

        db.collection("posts").doc(action.payload._id)
        .update(action.payload).then(()=>{
          action.asyncDispatch(mainAction(ACTIONS.UPDATE_POST_SUCCESS,action.payload))
        });
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
        let image = {
          albumID: action.payload.albumID,
          caption: action.payload.caption ? action.payload.caption:"",
          cover: action.payload.cover,
          imageName:action.payload.image.name
        }
      db.collection("postimages")
       .doc()
       .set(image)
       .then(() => {
         action.asyncDispatch(mainAction(ACTIONS.UPLOAD_POST_IMAGE_SUCCESS,action.payload))
       });
       
       return state
     }
      case ACTIONS.UPLOAD_POST_IMAGE_SUCCESS:{
        let postImageRef = storage.ref('posts/'+action.payload.image.name).put(action.payload.image);
        postImageRef.on('state_changed',(snapshot)=>{
          //progress function
        },(error)=>{
          //error
          console.log(error)
        },()=>{
          //complete
          storage.ref('posts/').child(action.payload.image.name).getDownloadURL().then(url=>{
            console.log(action,url)
            action.asyncDispatch(mainAction(ACTIONS.LOAD_POST,action.payload.albumID))
          })
        })
        return state
      }
      case ACTIONS.UPLOAD_POST_IMAGE_FAIL:{
        return state
      }
      default: 
        return state
       
    }
  }//No. 5 JPEG.jpg