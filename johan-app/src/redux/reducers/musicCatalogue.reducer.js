import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"

const initialState = {};
export default function catalogueReducer (state = initialState, action) {
    switch (action.type) {
  
      case ACTIONS.LOAD_MUSIC_CATALOGUE: {
       fetch(' http://127.0.0.1:5021/api/loadMusicAlbums')
        .then((data) => data.json())
        .then((res) => {
          action.asyncDispatch(mainAction(ACTIONS.LOAD_MUSIC_CATALOGUE_SUCCESS,res.data))
        }).catch(err => action.asyncDispatch(mainAction(ACTIONS.LOAD_MUSIC_CATALOGUE_FAIL,err)))

        return state
      }
      case ACTIONS.LOAD_MUSIC_CATALOGUE_SUCCESS: {
        return action.payload
      }
      case ACTIONS.LOAD_MUSIC_CATALOGUE_FAIL: {

        return state
      }
      
      default: 
        return {
          ...state
        }
    }
  }