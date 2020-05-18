import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"
import { db } from "../../firebase";
import _ from 'lodash'
const initialState = {};
export default function postsReducer (state = initialState, action) {
    switch (action.type) {
  
      case ACTIONS.LOAD_POSTS: {
      let stateCopy = ''
       //=======================================================
      db.collection("posts")
      .where("showPost",'==','1')
      .orderBy('postDate','desc')
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        stateCopy = data;

        //=======================================================
          db.collection("postimages")
          .get()
          .then(querySnapshot => {
            const data = querySnapshot.docs.map(doc => doc.data());
            stateCopy.map((post,i)=>{
            return stateCopy[i].image = data.filter(image => image.albumID === stateCopy[i].ID)
            })
            action.asyncDispatch(mainAction(ACTIONS.LOAD_POSTS_SUCCESS,stateCopy))
          });
        //========================================================
      });
        return state
      }
      case ACTIONS.LOAD_POSTS_SUCCESS: {

        return action.payload
      }
      case ACTIONS.LOAD_POSTS_FAIL: {

        return state
      }
      case ACTIONS.LOAD_DASHBOARD_POSTS: {

        let stateCopy = ''
        let _id = ''
        db.collection("posts")
      .orderBy('postDate','desc')
      .get()
      .then(snapshotChanges => {
        const data = snapshotChanges.docs.map(doc => {
          _id=doc.id
          return doc.data()});
        stateCopy = data;

        //=======================================================
          db.collection("postimages")
          .get()
          .then(querySnapshot => {
            const data = querySnapshot.docs.map(doc => doc.data());
            stateCopy.map((post,i)=>{
            return stateCopy[i].image = data.filter(image => image.albumID === stateCopy[i].ID)
            })
            action.asyncDispatch(mainAction(ACTIONS.LOAD_DASHBOARD_POSTS_SUCCESS,stateCopy))
          });
        //========================================================
      });
         return state
       }
       case ACTIONS.LOAD_DASHBOARD_POSTS_SUCCESS: {
         let stateCopy = action.payload
         let imageName = []
         fetch('http://127.0.0.1:5021/api/loadPostImages')
             .then((data) => data.json())
             .then((res) => {
               action.asyncDispatch(mainAction(ACTIONS.LOAD_POST_IMAGES_SUCCESS,res.data))
               imageName = stateCopy.map(post => {
                 post.image = Object.values(res.data).filter(image => image.albumID === post.ID).map(postImage =>{
                   return postImage
                 })
   
               })
             }).catch(err => action.asyncDispatch(mainAction(ACTIONS.LOAD_POST_IMAGES_FAIL,err)))
             
         return stateCopy
       }
       case ACTIONS.LOAD_DASHBOARD_POSTS_FAIL: {
 
         return state
       }
      default: 
        return state
        
    }
  }