import { ACTIONS } from 'redux/actions/types.js'
import { mainAction } from "redux/actions/index.actions"
import { db } from "../../firebase";
import  _ from "lodash"
const initialState = {};
export default function presentationsReducer (state = initialState, action) {
    switch (action.type) {
  
      case ACTIONS.LOAD_PRESENTATIONS: {
        let stateCopy = []
         db.collection("presentations")
         .orderBy('cdName')
        .get()
        .then(querySnapshot => {
          const data = querySnapshot.docs.map(doc => doc.data());
          let x =  action.payload.limit - action.payload.skip;
          console.log(x)
          data.map((newData,i)=>{
            if(i < action.payload.limit && i > action.payload.skip)
            stateCopy.push(newData)
          })
          action.asyncDispatch(mainAction(ACTIONS.LOAD_PRESENTATIONS_SUCCESS,stateCopy))
        });
        
        return state
      }
      case ACTIONS.LOAD_PRESENTATIONS_SUCCESS: {
        return _.sortBy(action.payload,['cdName','asc'])
      }
      case ACTIONS.LOAD_PRESENTATIONS_FAIL: {

        return state
      }
      
      default: 
        return {
          ...state
        }
    }
  }