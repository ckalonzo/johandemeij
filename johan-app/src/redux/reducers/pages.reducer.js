import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"
import { db} from "../../firebase";
import _ from "lodash"
const initialState = {
   
};
export default function pageReducer (state = initialState, action) {
    switch (action.type) {
  
      case ACTIONS.LOAD_PAGE: {
        db.collection("pages")
        .where('id','==',action.payload)
        .get()
        .then((snapshot) => {
            const data = snapshot.docs.map(doc => {return doc.data()});
            action.asyncDispatch(mainAction(ACTIONS.LOAD_PAGE_SUCCESS,{...data}))
        })
        return state
      }
      case  ACTIONS.LOAD_PAGE_SUCCESS: {
        return action.payload[0]
      }
      case ACTIONS.LOAD_PAGES: {
        db.collection("pages")
        .get()
        .then((snapshot)=>{
            const data = snapshot.docs.map(doc => {return doc.data()});
            action.asyncDispatch(mainAction(ACTIONS.LOAD_PAGES_SUCCESS,{...data}))
        })
        return state
      }
      case  ACTIONS.LOAD_PAGES_SUCCESS: {
     
        return action.payload
      }
      case ACTIONS.UPDATE_PAGE:{
        let _id =''
        db.collection("pages")
      .where("id","==",action.payload.id)
      .get()
      .then(snapshot => {
        const data = snapshot.docs.map(doc => {
          _id = doc.id
          return doc.data()});
          db.collection("pages").doc(_id)
          .update(action.payload).then(()=>{
            console.log("success")
          action.asyncDispatch(mainAction(ACTIONS.UPDATE_PAGE_SUCCESS,action.payload))
       });
      })
      }
      case ACTIONS.UPDATE_PAGE_SUCCESS:{
          return action.payload
      }
      default: 
        return {
          ...state
        }
    }
  }