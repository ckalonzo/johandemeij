import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"
import { db } from "../../firebase";
import _ from 'lodash'
const initialState = {};
export default function cdInfoReducer (state = initialState, action) {
    switch (action.type) {
  
      case ACTIONS.LOAD_CD_INFO: {

        let stateCopy = ''
        //=======================================================
        db.collection("cd_info")
        .where("cdId","==",action.payload)
       .get()
       .then(querySnapshot => {
         const data = querySnapshot.docs.map(doc => doc.data());
         stateCopy = data;
       
         //=======================================================
           db.collection("presentations")
           .get()
           .then(querySnapshot => {
             const data = querySnapshot.docs.map(doc => doc.data());

             stateCopy.map((post,i)=>{
              post.title =data.filter(track => track.id === stateCopy[i].track_title).map(title=>title.cdName) 
              post.duration  =data.filter(track => track.id === stateCopy[i].track_title).map(title=>title.totalTime) 
              post.codes =data.filter(track => track.id === stateCopy[i].track_title).map(title=>title.codes) 
             // post.grade =data.filter(track => track.id === stateCopy[i].track_title).map(title=>title.grade) 
             
             return post
             })
             action.asyncDispatch(mainAction(ACTIONS.LOAD_CD_INFO_SUCCESS,stateCopy))
           });
         //========================================================
       });



        return state
      }
      case ACTIONS.LOAD_CD_INFO_SUCCESS: {
        
        return action.payload
      }
      case ACTIONS.LOAD_CD_INFO_FAIL: {

        return state
      }
      case ACTIONS.UPDATE_CD_INFO:{
       let cd_id
        db.collection("cd_info")
        .where("id",'==',action.payload.id)
         .get()
         .then(querySnapshot => {
           const data = querySnapshot.docs.map(doc => {
            cd_id=doc.id
            return doc.data()}); 
            db.collection("cd_info").doc(cd_id)
        .update(action.payload).then(()=>{
          action.asyncDispatch(mainAction(ACTIONS.UPDATE_CD_INFO_SUCCESS,action.payload))
        });
          
          })
       
        return state
      }
      case ACTIONS.UPDATE_CD_INFO_SUCCESS:{
        action.asyncDispatch(mainAction(ACTIONS.LOAD_CD_INFO,action.payload.cdId))
        return state
      }
      case ACTIONS.UPDATE_CD_INFO_FAIL:{
        return state
      }
      case ACTIONS.CREATE_CD_INFO:{
        let stateCopy = _.cloneDeep(action.payload)
        console.log(action.payload)
          db.collection("cd_info")
          .add(stateCopy)
          .then((docRef)=>{
            stateCopy._id = docRef.id
            db.collection("cd_info")
            .doc(docRef.id)
            .update({_id:docRef.id}).then(()=>{
              action.asyncDispatch(mainAction(ACTIONS.CREATE_CD_INFO_SUCCESS,stateCopy))
            });
           
          });
        return state
      }
      case ACTIONS.CREATE_CD_INFO_SUCCESS:{
        action.asyncDispatch(mainAction(ACTIONS.LOAD_CD_INFO,action.payload.cdId))
        return state
      }
      case ACTIONS.CREATE_CD_INFO_FAIL:{
        return state
      }
      case ACTIONS.DELETE_CD_INFO:{
        console.log(action)
        db.collection("cd_info")
        .where('id','==',action.payload.id)
         .get()
         .then((querySnapshot) => {
           querySnapshot.forEach((doc)=> doc.ref.delete())
           action.asyncDispatch(mainAction(ACTIONS.DELETE_POST_SUCCESS,action.payload.cdId))
         });
      }
      case ACTIONS.DELETE_CD_INFO_SUCCESS:{
        action.asyncDispatch(mainAction(ACTIONS.LOAD_CD_INFO,action.payload))
        return state
      }
      default: 
        return {
          ...state
        }
    }
  }