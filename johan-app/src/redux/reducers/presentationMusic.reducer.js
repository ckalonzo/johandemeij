import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"
const initialState = {
   
};
export default function presentationMusic (state = initialState, action) {
    switch (action.type) {
  
     case ACTIONS.CREATE_PUBLICATION_MUSIC : {
         
     }
     case ACTIONS.CREATE_PUBLICATION_MUSIC_SUCCESS : {

     }
     case ACTIONS.CREATE_PUBLICATION_MUSIC_FAIL : {

     }
     case ACTIONS.DELETE_PUBLICATION_MUSIC : {

     }
     case ACTIONS.DELETE_PUBLICATION_MUSIC_SUCCESS : {

     }
     case ACTIONS.DELETE_PUBLICATION_MUSIC_FAIL : {

     }
      default: 
        return {
          ...state
        }
    }
  }