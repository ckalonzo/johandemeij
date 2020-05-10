import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"
import _ from "lodash"

const initialState = {
   
};
export default function musicProfileReducer (state = initialState, action) {
    switch (action.type) {
  
      case ACTIONS.LOAD_MUSIC_PROFILE: {
       fetch('http://http://132.148.157.71:5021/api/loadMusicProfile/'+action.payload)
        .then((data) => data.json())
        .then((res) => {
          action.asyncDispatch(mainAction(ACTIONS.LOAD_MUSIC_PROFILE_SUCCESS,res.data))
        }).catch(err => action.asyncDispatch(mainAction(ACTIONS.LOAD_MUSIC_PROFILE_FAIL,err)))

        return state
      }
      case ACTIONS.LOAD_MUSIC_PROFILE_BY_ID:{
        fetch('http://http://132.148.157.71:5021/api/loadMusicProfileByID/'+action.payload)
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