import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"
import _ from "lodash"

const initialState = {
    categories:[
        {id:1,name:"Compositions"},
        {id:2,name:"Amstel Classics"},
        {id:3,name:"Music for the Theatre"},
        {id:4,name:"Symphony Orchestra"},
        {id:5,name:"The Music of S&oslash;ren Hyldgaard"},
        {id:6,name:"Solo Concertos"},
        {id:9,name:"Cd's"},
        {id:0,name:"All music"},
    ],
    allPresentations:[]
};
export default function musicReducer (state = initialState, action) {
    switch (action.type) {
  
      case ACTIONS.LOAD_MUSIC: {
       fetch('http://localhost:3001/api/loadPresentations/0/0')
        .then((data) => data.json())
        .then((res) => {
          action.asyncDispatch(mainAction(ACTIONS.LOAD_MUSIC_SUCCESS,res.data))
        }).catch(err => action.asyncDispatch(mainAction(ACTIONS.LOAD_MUSIC_FAIL,err)))

        return state
      }
      
      case ACTIONS.LOAD_MUSIC_SUCCESS: {
          let stateCopy = _.cloneDeep(state)
          stateCopy.allPresentations = action.payload
        return stateCopy
      }
      case ACTIONS.LOAD_MUSIC_FAIL: {

        return state
      }
      case ACTIONS.LOAD_MUSIC_BY_CATEGORY:{
        fetch('http://localhost:3001/api/filterPresentationCategory/'+action.payload)
        .then((data) => data.json())
        .then((res) => {
          action.asyncDispatch(mainAction(ACTIONS.LOAD_MUSIC_BY_CATEGORY_SUCCESS,res.data))
        }).catch(err => action.asyncDispatch(mainAction(ACTIONS.LOAD_MUSIC_FAIL,err)))
         return state 
      }
      case ACTIONS.LOAD_MUSIC_BY_CATEGORY_SUCCESS:{
        let stateCopy = _.cloneDeep(state)
        stateCopy.allPresentations = action.payload
         return stateCopy 
      }
      
      default: 
        return {
          ...state
        }
    }
  }