import { combineReducers } from 'redux';
import postsReducer from "redux/reducers/posts.reducer"
import singlePostReducer from "redux/reducers/singlePost.reducer"
import postImagesReducer from "redux/reducers/postImages.reducer"
import postImageReducer from "redux/reducers/postImage.reducer"
import presentationsReducer from "redux/reducers/presentations.reducer"
import cdsReducer from "redux/reducers/cds.reducer"
import catalogueReducer from "redux/reducers/musicCatalogue.reducer"
import agendaReducer from "redux/reducers/agenda.reducer"
import musicReducer from "redux/reducers/music.reducer"
import orderReducer from "redux/reducers/orderLocations.reducer"
import musicProfileReducer from "redux/reducers/musicProfile.reducer"
const indexReducer = combineReducers({
  postsReducer,
  singlePostReducer,
  postImagesReducer,
  postImageReducer,
  presentationsReducer,
  cdsReducer,
  catalogueReducer,
  agendaReducer,
  musicReducer,
  orderReducer,
  musicProfileReducer
});
  
  export default indexReducer;