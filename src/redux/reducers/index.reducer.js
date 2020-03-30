import { combineReducers } from 'redux';
import postsReducer from "redux/reducers/posts.reducer"
import singlePostReducer from "redux/reducers/singlePost.reducer"
const indexReducer = combineReducers({
  postsReducer,
  singlePostReducer
  
});
  
  export default indexReducer;