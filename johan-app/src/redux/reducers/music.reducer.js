import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"
import { db } from "../../firebase";
import _ from 'lodash'

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
      //  fetch('http://127.0.0.1:5021/api/loadPresentations/0/0')
      //   .then((data) => data.json())
      //   .then((res) => {
      //     action.asyncDispatch(mainAction(ACTIONS.LOAD_MUSIC_SUCCESS,res.data))
      //   }).catch(err => action.asyncDispatch(mainAction(ACTIONS.LOAD_MUSIC_FAIL,err)))

      db.collection("presentations")
      .orderBy('cdName', 'asc')
        .get()
        .then(querySnapshot => {
          const data = querySnapshot.docs.map(doc => doc.data());
          action.asyncDispatch(mainAction(ACTIONS.LOAD_MUSIC_SUCCESS,data))
        });

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

        db.collection("presentations").
        where("category","==", action.payload.toString()).
        orderBy('cdName', 'asc').
        get()
        .then(querySnapshot => {
          const data = querySnapshot.docs.map(doc => doc.data());
          action.asyncDispatch(mainAction(ACTIONS.LOAD_MUSIC_SUCCESS,data))
        });
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