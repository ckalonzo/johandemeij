import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"
import { db} from "../../firebase";
const initialState = {};
export default function postImagesReducer (state = initialState, action) {
    switch (action.type) {
  
      case ACTIONS.LOAD_POST_IMAGES:{
        fetch('http://127.0.0.1:5021/api/loadPostImages')
        .then((data) => data.json())
        .then((res) => {
          action.asyncDispatch(mainAction(ACTIONS.LOAD_POST_IMAGES_SUCCESS,res.data))
        }).catch(err => action.asyncDispatch(mainAction(ACTIONS.LOAD_POST_IMAGES_FAIL,err)))
        return state
      }
      case ACTIONS.LOAD_POST_IMAGES_SUCCESS:{
        
        return {state,...action.payload}
      }
      case ACTIONS.LOAD_POST_IMAGES_FAIL:{
        return state
      }
      case ACTIONS.LOAD_PRESENTATION_IMAGES:{

        db.collection("postimages")
        .where("albumID",'==',action.payload)
         .get()
         .then(querySnapshot => {
           const data = querySnapshot.docs.map(doc =>doc.data()); 
           console.log(data)
            action.asyncDispatch(mainAction(ACTIONS.LOAD_PRESENTATION_IMAGES_SUCCESS,data))
         });
        
        return state
      }
      case ACTIONS.LOAD_PRESENTATION_IMAGES_SUCCESS:{
        
        return {state,...action.payload}
      }
      case ACTIONS.LOAD_PRESENTATIONS_IMAGES_FAIL:{
        return state
      }
      default: 
        return state
       
    }
  }