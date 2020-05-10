import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"

const initialState = {};
export default function postsReducer (state = initialState, action) {
    switch (action.type) {
  
      case ACTIONS.LOAD_POSTS: {
        
       fetch('http://132.148.157.71:5021/api/loadPosts')
        .then((data) => data.json())
        .then((res) => {
          action.asyncDispatch(mainAction(ACTIONS.LOAD_POSTS_SUCCESS,res.data))
        }).catch(err => action.asyncDispatch(mainAction(ACTIONS.LOAD_POSTS_FAIL,err)))
       
        return state
      }
      case ACTIONS.LOAD_POSTS_SUCCESS: {
        let stateCopy = action.payload
        let imageName = []
        fetch('http://132.148.157.71:5021/api/loadPostImages')
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
      case ACTIONS.LOAD_POSTS_FAIL: {

        return state
      }
      case ACTIONS.LOAD_DASHBOARD_POSTS: {
        
        fetch('http://132.148.157.71:5021/api/loadAllPosts')
         .then((data) => data.json())
         .then((res) => {
           action.asyncDispatch(mainAction(ACTIONS.LOAD_DASHBOARD_POSTS_SUCCESS,res.data))
         }).catch(err => action.asyncDispatch(mainAction(ACTIONS.LOAD_DASHBOARD_POSTS_FAIL,err)))
        
         return state
       }
       case ACTIONS.LOAD_DASHBOARD_POSTS_SUCCESS: {
         let stateCopy = action.payload
         let imageName = []
         fetch('http://132.148.157.71:5021/api/loadPostImages')
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