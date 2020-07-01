import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"
import { db,storage} from "../../firebase";
const initialState = {
   
};
export default function presentationMusic (state = initialState, action) {
    switch (action.type) {
  
     case ACTIONS.CREATE_PUBLICATION_MUSIC : {
      let stateCopy = _.cloneDeep(action.payload)
      let file = {
        id: action.payload.id,
        musicName: action.payload.musicFile,
        pres_id: action.payload.ID 
      }
      
      db.collection("postimages")
          .doc()
          .set(file)
          .then(() => {
            action.asyncDispatch(mainAction(ACTIONS.CREATE_PUBLICATION_MUSIC_SUCCESS,action.payload))
          })
     }
     case ACTIONS.CREATE_PUBLICATION_MUSIC_SUCCESS : {
      let postImageRef = storage.ref('music/'+action.payload.image.name).put(action.payload.image);
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

     }
     case ACTIONS.CREATE_PUBLICATION_MUSIC_FAIL : {

     }
     case ACTIONS.DELETE_PUBLICATION_MUSIC : {

     }
     case ACTIONS.DELETE_PUBLICATION_MUSIC_SUCCESS : {

     }
     case ACTIONS.DELETE_PUBLICATION_MUSIC_FAIL : {

     }
      default: 
        return {
          ...state
        }
    }
  }