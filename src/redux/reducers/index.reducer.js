import { combineReducers } from 'redux';
import postsReducer from "redux/reducers/posts.reducer"
import singlePostReducer from "redux/reducers/singlePost.reducer"
import postImagesReducer from "redux/reducers/postImages.reducer"
const indexReducer = combineReducers({
  postsReducer,
  singlePostReducer,
  postImagesReducer
  
});
  
  export default indexReducer;