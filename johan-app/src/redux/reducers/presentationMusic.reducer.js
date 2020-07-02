import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"
import { db,storage} from "../../firebase";
const initialState = {
   
};
export default function presentationMusicReducer (state = initialState, action) {
    switch (action.type) {
  
     case ACTIONS.CREATE_PUBLICATION_MUSIC : {
      let stateCopy = action.payload
      let file = {
        id: action.payload.id,
        musicName: action.payload.file.name,
        pres_id: action.payload.pres_id,
      }
      console.log(file)
      db.collection("presentationmusic")
          .doc()
          .set(file)
          .then(() => {
            action.asyncDispatch(mainAction(ACTIONS.CREATE_PUBLICATION_MUSIC_SUCCESS,action.payload))
          })
      return state
     }
     case ACTIONS.CREATE_PUBLICATION_MUSIC_SUCCESS : {
      let postImageRef = storage.ref('music/'+action.payload.file.name).put(action.payload.file);
      postImageRef.on('state_changed',(snapshot)=>{
        //progress function
      },(error)=>{
        //error
        console.log(error)
      },()=>{
        //complete
        storage.ref('/music').child(action.payload.file.name).getDownloadURL().then(url=>{
          console.log(url)
          action.asyncDispatch(mainAction(ACTIONS.LOAD_PUBLICATION_MUSIC,action.payload.pres_id))
        })
      })

     }
     case ACTIONS.CREATE_PUBLICATION_MUSIC_FAIL : {
      return state
     }
     case ACTIONS.DELETE_PUBLICATION_MUSIC : {
       
         db.collection("presentationmusic")
         .where('id','==',action.payload.ID)
          .get()
          .then((querySnapshot) => {
           querySnapshot.forEach((doc)=>{
              console.log(doc.ref.id,doc.ref.parent,doc.ref.path)
              doc.ref.delete()
             })
           action.asyncDispatch(mainAction(ACTIONS.DELETE_PUBLICATION_MUSIC_SUCCESS,action.payload))
          });
      
      return state
     }
     case ACTIONS.DELETE_PUBLICATION_MUSIC_SUCCESS : {
      let postImageRef = storage.ref('music/'+action.payload.name)
      postImageRef.delete().then(()=>console.log("file deleted"));
      action.asyncDispatch(mainAction(ACTIONS.LOAD_PUBLICATION_MUSIC,action.payload.ID))
      //window.location.reload()
      return state
     }
     case ACTIONS.DELETE_PUBLICATION_MUSIC_FAIL : {
      return state
     }
     case ACTIONS.LOAD_PUBLICATION_MUSIC : {
       db.collection("presentationmusic")
       .where("pres_id","==",action.payload)
       .get()
       .then(snapshot=>{
         const data = snapshot.docs.map(doc => {return doc.data()})
         console.log()
         action.asyncDispatch(mainAction(ACTIONS.LOAD_PUBLICATION_MUSIC_SUCCESS,data))
       })
       .catch(err=>{
        action.asyncDispatch(mainAction(ACTIONS.LOAD_PUBLICATION_MUSIC_FAIL,action.payload))
       })

      return state
     }
     case ACTIONS.LOAD_PUBLICATION_MUSIC_SUCCESS : {
      return action.payload
     }
     case ACTIONS.LOAD_PUBLICATION_MUSIC_FAIL : {
      return state
     }
      default: 
        return {
          ...state
        }
    }
  }