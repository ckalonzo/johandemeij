import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"
import { db } from "../../firebase";
import _ from "lodash"
const initialState = {};
export default function catalogueReducer (state = initialState, action) {
    switch (action.type) {
  
      case ACTIONS.LOAD_MUSIC_CATALOGUE: {
      db.collection("musicalbums")
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        action.asyncDispatch(mainAction(ACTIONS.LOAD_MUSIC_CATALOGUE_SUCCESS,data))
      });


        return state
      }
      case ACTIONS.LOAD_MUSIC_CATALOGUE_SUCCESS: {
        return action.payload
      }
      case ACTIONS.LOAD_MUSIC_CATALOGUE_FAIL: {

        return state
      }
      case ACTIONS.CREATE_CATALOGUE:{
        console.log(action)
        let stateCopy = _.cloneDeep(action.payload)
      
        db.collection("musicalbums")
          .add(stateCopy)
          .then(function(docRef){
            console.log(docRef)
            stateCopy._id = docRef.id
            action.asyncDispatch(mainAction(ACTIONS.CREATE_CATALOGUE_SUCCESS,stateCopy))
          });
          return state
      }
      case ACTIONS.CREATE_CATALOGUE_SUCCESS: {
        return action.payload
      }
      case ACTIONS.DELETE_CATALOGUE:{
        db.collection("musicalbums")
        .where('id','==',action.payload)
         .get()
         .then((querySnapshot) => {
           querySnapshot.forEach((doc)=> doc.ref.delete())
           action.asyncDispatch(mainAction(ACTIONS.DELETE_CATALOGUE_SUCCESS,[]))
         });
        return state
      }
      case ACTIONS.DELETE_CATALOGUE_SUCCESS:{
        action.asyncDispatch(mainAction(ACTIONS.LOAD_MUSIC_CATALOGUE,[]))
        return state
      }
      case ACTIONS.DELETE_CATALOGUE_FAIL:{
        return state
      }
      case ACTIONS.LOAD_CATALOGUE:{
        db.collection("musicalbums")
        .where("id",'==',action.payload)
          .get()
          .then(querySnapshot => {
            const data = querySnapshot.docs.map(doc => doc.data());
            action.asyncDispatch(mainAction(ACTIONS.LOAD_CATALOGUE_SUCCESS,...data))
          });
        return state
      }
      case ACTIONS.LOAD_CATALOGUE_SUCCESS:{
        
        return action.payload ? action.payload : state
      }
      case ACTIONS.LOAD_CATALOGUE_FAIL:{
        return state
      }
      case ACTIONS.UPDATE_CATALOGUE:{
        let stateCopy = _.cloneDeep(action.payload)
        let _id = 
        console.log(stateCopy.id)
        if(stateCopy.id)
        db.collection("musicalbums")
        .where("id",'==',stateCopy.id)
          .get()
          .then(querySnapshot => {
            const data = querySnapshot.docs.map(doc => {
              _id = doc.id
              return doc.data()});
           db.collection("musicalbums").doc(_id)
            .update(stateCopy).then(()=>{
              action.asyncDispatch(mainAction(ACTIONS.UPDATE_CATALOGUE_SUCCESS,stateCopy))
            });
          });
       
        return state
      }
      case ACTIONS.UPDATE_CATALOGUE_SUCCESS:{
        return state
      }
      case ACTIONS.UPDATE_CATALOGUE_FAIL:{
        return state
      }
      default: 
        return {
          ...state
        }
    }
  }