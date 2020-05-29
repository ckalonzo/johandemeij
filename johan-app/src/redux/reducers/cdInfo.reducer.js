import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"
import { db } from "../../firebase";
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
              post.duration  =data.filter(track => track.id === stateCopy[i].track_title).map(title=>title.duration) 
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
      
      default: 
        return {
          ...state
        }
    }
  }