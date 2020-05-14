import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"
import { db } from "../../firebase";
import _ from 'lodash'

const initialState = {
   
};
export default function musicProfileReducer (state = initialState, action) {
    switch (action.type) {
  
      case ACTIONS.LOAD_MUSIC_PROFILE: {
      //  fetch('http://127.0.0.1:5021/api/loadMusicProfile/'+action.payload)
      //   .then((data) => data.json())
      //   .then((res) => {
      //     action.asyncDispatch(mainAction(ACTIONS.LOAD_MUSIC_PROFILE_SUCCESS,res.data))
      //   }).catch(err => action.asyncDispatch(mainAction(ACTIONS.LOAD_MUSIC_PROFILE_FAIL,err)))
      // db.collection("presentations")
      //  .where("id",'==',"1050")
      //    .get()
      //    .then(querySnapshot => {
      //      const data = querySnapshot.docs.map(doc => doc.data());
      //      action.asyncDispatch(mainAction(ACTIONS.LOAD_MUSIC_PROFILE_SUCCESS,action.payload))
      //    });
      action.asyncDispatch(mainAction(ACTIONS.LOAD_MUSIC_PROFILE_SUCCESS,action.payload))
        return action.payload
      }
      case ACTIONS.LOAD_MUSIC_PROFILE_BY_ID:{
        fetch('http://127.0.0.1:5021/api/loadMusicProfileByID/'+action.payload)
        .then((data) => data.json())
        .then((res) => {
          action.asyncDispatch(mainAction(ACTIONS.LOAD_MUSIC_PROFILE_SUCCESS,res.data))
        }).catch(err => action.asyncDispatch(mainAction(ACTIONS.LOAD_MUSIC_PROFILE_FAIL,err)))

        return state
      }
      
      case ACTIONS.LOAD_MUSIC_PROFILE_SUCCESS: {
        return action.payload
      }
      case ACTIONS.LOAD_MUSIC_PROFILE_FAIL: {

        return state
      }
      
      
      default: 
        return {
          ...state
        }
    }
  }