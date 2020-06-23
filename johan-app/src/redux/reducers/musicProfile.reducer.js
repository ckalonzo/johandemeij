import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"
import { db } from "../../firebase";
import _ from "lodash"
const initialState = {
   
};
export default function musicProfileReducer (state = initialState, action) {
    switch (action.type) {
  
      case ACTIONS.LOAD_MUSIC_PROFILE: {
      
      db.collection("presentations")
       .where("id",'==',action.payload)
         .get()
         .then(querySnapshot => {
           let mainData = [];
           const data = querySnapshot.docs.map(doc => doc.data());
           mainData = {...data}

           db.collection("presentationmuic")
           .where("pres_id",'==',mainData[0].id)
             .get()
             .then(querySnapshot => {
               const data = querySnapshot.docs.map(doc => doc.data());
               mainData[0].music = {...data}
               action.asyncDispatch(mainAction(ACTIONS.LOAD_MUSIC_PROFILE_SUCCESS,mainData[0]))
             }); 
            
          
         });
     
        return state
      }
      case ACTIONS.LOAD_MUSIC_PROFILE_BY_ID:{
        db.collection("presentations")
       .where("id",'==',action.payload)
         .get()
         .then(querySnapshot => {
           const data = querySnapshot.docs.map(doc => doc.data());
           action.asyncDispatch(mainAction(ACTIONS.LOAD_MUSIC_PROFILE_SUCCESS,...data))
         });
        return state
      }
      
      case ACTIONS.LOAD_MUSIC_PROFILE_SUCCESS: {
        let newData = _.cloneDeep(action.payload)
        return newData
      }
      case ACTIONS.LOAD_MUSIC_PROFILE_FAIL: {

        return state
      }
      
      
      default: 
        return {
          ...state
        }
    }
  }