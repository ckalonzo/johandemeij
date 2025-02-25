import { combineReducers } from 'redux';
import postsReducer from "redux/reducers/posts.reducer"
import singlePostReducer from "redux/reducers/singlePost.reducer"
import postImagesReducer from "redux/reducers/postImages.reducer"
import postImageReducer from "redux/reducers/postImage.reducer"
import presentationsReducer from "redux/reducers/presentations.reducer"
import presentationReducer from "redux/reducers/presentation.reducer"
import cdsReducer from "redux/reducers/cds.reducer"
import cdReducer from "redux/reducers/cd.reducer"
import catalogueReducer from "redux/reducers/musicCatalogue.reducer"
import agendaReducer from "redux/reducers/agenda.reducer"
import musicReducer from "redux/reducers/music.reducer"
import orderReducer from "redux/reducers/orderLocations.reducer"
import musicProfileReducer from "redux/reducers/musicProfile.reducer"
import AllPresentationsReducer from "redux/reducers/allpresentations.reducer"
import AllAgendasReducer from "redux/reducers/allAgendas.reducer"
import eventsReducer from "redux/reducers/events.reducer"
import concertInformationReducer from "redux/reducers/concertInfomation.reducer"
import miscItemsReducer from "redux/reducers/miscItems.reducer"
import cdInfoReducer from "redux/reducers/cdInfo.reducer"
import headerReducer from "redux/reducers/header.reducer"
import contactUsReducer from "redux/reducers/contactUs.reducer"
import userReducer from "redux/reducers/user.reducer"
import pageReducer from "redux/reducers/pages.reducer"
import presentationMusicReducer from "redux/reducers/presentationMusic.reducer"
import galleryReducer from "redux/reducers/gallery.reducer"

const indexReducer = combineReducers({
  agendaReducer,
  AllPresentationsReducer,
  AllAgendasReducer,
  catalogueReducer,
  cdsReducer,
  cdReducer,
  cdInfoReducer,
  contactUsReducer,
  concertInformationReducer,
  eventsReducer,
  galleryReducer,
  headerReducer,
  userReducer,
  orderReducer, 
  musicReducer,
  musicProfileReducer,
  miscItemsReducer,
  pageReducer,
  presentationMusicReducer,
  presentationReducer,
  postsReducer, 
  postImagesReducer,
  postImageReducer,
  presentationsReducer,
  singlePostReducer
});
  
  export default indexReducer;