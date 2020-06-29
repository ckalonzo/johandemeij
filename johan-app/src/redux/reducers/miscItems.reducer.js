//import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"
import { db } from "../../firebase";
const initialState = {};
export default function miscItemsReducer (state = initialState, action) {
    switch (action.type) {
      case "GET_MISC_ITEMS":{
        let title = "",
            content
        db.collection("miscellaneousitems")
        .get()
        .then(querySnapshot => {
          const data = querySnapshot.docs.map(doc => doc.data());
           action.asyncDispatch(mainAction("GET_MISC_ITEMS_SUCCESS",data))
        });
        return {title,content}
      }
      case "GET_MISC_ITEMS_SUCCESS":{
       
          return action.payload[0] ? action.payload[0] : state
      }
      
      default: 
        return state
       
    }
  }